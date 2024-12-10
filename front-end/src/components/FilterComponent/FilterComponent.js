import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";

export class FilterComponent extends BaseComponent {
  #container = null;
  #hub = null; //Attribute for EventHub, used for obtaining eventHub instance
  #loginButton = null; //Attribute for obtaining element for loginButton
  #registerButton = null; // Attribute for obtaining element for registerButton

  constructor(filterData = {}) {
    super();
    this.#hub = EventHub.getInstance();
    this.taskData = filterData;
    this.loadCSS("FilterComponent");
  }

  render(data=null) {
    if (this.#container) {
      return this.#container;
    }

    // Creates container and event listeners for filter
    this.#createContainer();
    this.#attachEventListeners();
    return this.#container;
  }

  #createContainer() {
    // Create and configure the container element
    this.#container = document.createElement("div");
    this.#container.classList.add("navbar");
    this.#container.innerHTML = this.#getTemplate();
  }

  #getTemplate() {
    // Returns the HTML template for the component
    return `
    <input type="text" id="filterInput" placeholder="Add filter...">
    <button id="filterBtn">Filter</button>
    <button id="loginBtn">Login</button>
    <button id="registerBtn">Register</button>
    <h2 id="message">Currently not logged in</h2>
      
    `;
  }

  #attachEventListeners() {
    // Attach event listeners to the input and button elements
    const filterBtn = this.#container.querySelector("#filterBtn");
    const filterInput = this.#container.querySelector("#filterInput");
    this.#loginButton = this.#container.querySelector("#loginBtn");
    this.#registerButton = this.#container.querySelector("#registerBtn");
    const msg = this.#container.querySelector("#message");

    filterBtn.addEventListener("click", () => this.#handleFilter(filterInput));
    this.#loginButton.addEventListener("click", this.#handleLogin.bind(this));
    this.#registerButton.addEventListener("click",()=>this.#handleRegister());
    this.#listenToEvent('handleLogin',(username)=>{
      // const message = username;
      this.#loginButton.innerHTML = "Logout";
      this.#registerButton.style.display = "none";
      msg.innerText = `Welcome, ${username}`;
      }
    );
    this.#listenToEvent('handleLogout',(event)=>{
      loginBtn.innerHTML = "Login";
      this.#registerButton.style.display = "flex";
      msg.innerText = "Currently not logged in";
    })
  }

  #handleFilter(filterInput) {
    const term = filterInput.value;

    if (!term) {
      alert("Please enter a filter.");
      return;
    }
    this.#publishNewTask("filter", term);
  }

  //Async method for when Login/Logout button is clicked
  async #handleLogin(){
    if (this.#loginButton.innerHTML === "Login")
    {
      this.#publishNewTask('handleRoute','login');
      return;
    }
    try {
      const response = await await fetch("http://localhost:3000/api/logout", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      })

      if (!response.ok){
        console.error(`HTTP Error: ${response.status}`);
        throw new Error(`HTTP Error: ${response.status}`);
      }
      this.#publishNewTask('handleRoute','app');
      localStorage.removeItem('user');

    } catch (error) {
			console.error("Error logging out:",error);
			throw new Error("Error logging out:",error);
		}
  }

  //Method for when register button is clicked
  #handleRegister(){
    this.#publishNewTask('handleRoute','register');
  }

  #publishNewTask(task, termInput) {
    this.#hub.publish(task, termInput);
  }

  #listenToEvent(task, method){
    this.#hub.subscribe(task,method);
  }
}
