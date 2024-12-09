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


  constructor() {
    this.#hub = EventHub.getInstance();
    this.#filter = new FilterComponent();
    this.#graph = new GraphComponent();
    this.#sidebar = new SidebarComponent();
    this.#login = new LoginComponent();
  }

  render() {
    if (this.#container && this.#container.innerHTML){
      return this.#container
    }
    this.#createContainer();
    this.#getApp();
    return this.#container;
  }

  #createContainer() {
    this.#container = document.createElement('div');
    this.#container.id = 'app';
  }

  #getApp(){
    this.#container.appendChild(this.#filter.render());
    // ERROR: Double graph render
    this.#container.appendChild(this.#graph.render());
    this.#graph.generateGraph();

    this.#container.appendChild(this.#sidebar.render());
  }

  #attachEventListeners(){
    this.#hub.subscribe('handleRoute',route => this.#handleRoute(route));
  }

  #getLogin(){
    this.#container.appendChild(this.#login.render());
  }

  #handleRoute(route){
    this.#container.innerHTML = '';
    switch(route){
      case 'app':
        this.#getApp();

      case 'login':
        this.#getLogin();
    }
  }
}
