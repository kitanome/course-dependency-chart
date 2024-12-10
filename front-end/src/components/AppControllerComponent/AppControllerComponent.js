import { FilterComponent } from "../FilterComponent/FilterComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { GraphComponent } from "../GraphComponent/GraphComponent.js";
import { SidebarComponent } from "../SidebarComponent/SidebarComponent.js";
import { LoginComponent } from "../LoginComponent/LoginComponent.js";

export class AppControllerComponent{
  #container = null; // Private container for the component
  #filter = null; // Instance of the filter component
  #hub = null; // EventHub instance for managing events
  #graph = null; // Instance of the graph component
  #sidebar = null; // Instance of the sidebar component
  #login = null; // Instance of the login component
  #data = null;


  constructor() {
    this.#hub = EventHub.getInstance();
    this.#filter = new FilterComponent();
    this.#graph = new GraphComponent();
    this.#sidebar = new SidebarComponent();
    this.#login = new LoginComponent();
    this.#data = null;
  }

  render(data=null) {
    if (this.#container && this.#container.innerHTML){
      return this.#container
    }
    if (data) this.#data = data;
    this.#createContainer();
    this.#getApp();
    this.#attachEventListeners();
    return this.#container;
  }

  #createContainer() {
    this.#container = document.createElement('div');
    this.#container.id = 'app';
  }

  async #getApp(){
    this.#container.appendChild(this.#filter.render());
    // ERROR: Double graph render
    this.#container.appendChild(this.#graph.render());
    this.#graph.generateGraph();

    this.#container.appendChild(this.#sidebar.render());
  }

  #getLogin(){
    this.#container.appendChild(this.#filter.render());
    this.#container.appendChild(this.#login.render());
  }

  async #attachEventListeners(){
    this.#hub.subscribe('handleRoute',route => this.#handleRoute(route));
  }

  async #handleRoute(route){
    this.#container.innerHTML = '';
    switch(route){
      case 'app':
        this.#getApp();
        try { this.#data = await this.checkAuth();}
        catch (error) {throw new Error(error);}
        break;

      case 'login':
        this.#getLogin();
    }
  }

  async checkAuth(){
    	try {
			let response = await fetch("http://localhost:3000/api/profile", {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			})

			if (!response.ok){
        this.#publishNewTask('handleLogout',null);
        return;
      }
			const data = await response.json();
      this.#publishNewTask('handleLogin',data.user);
      localStorage.setItem('user',data.user);
      const test = localStorage.getItem('user');
      console.log(`JSON fetched from authRequest: ${data}`);
      console.log(`Username fetched from authRequest: ${data.user}`);
      console.log(`User object in localStorage: ${test}`);
      return;
		} catch (error) {
			console.error("Error fetching profile data:",error);
			throw new Error("Error fetching profile data:",error);
		}
  }

  #publishNewTask(task,value){
    this.#hub.publish(task,value);
  }
}
