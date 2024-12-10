import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";

export class FilterComponent extends BaseComponent {
  #container = null;
  #hub = null;
  #loginButton = null;

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
    <h2 id="message">Currently not logged in</h2>
      
    `;
  }

  #attachEventListeners() {
    // Attach event listeners to the input and button elements
    const filterBtn = this.#container.querySelector("#filterBtn");
    const filterInput = this.#container.querySelector("#filterInput");
    this.#loginButton = this.#container.querySelector("#loginBtn");
    const msg = this.#container.querySelector("#message");

    filterBtn.addEventListener("click", () => this.#handleFilter(filterInput));
    this.#loginButton.addEventListener("click", this.#handleLogin.bind(this));
    this.#listenToEvent('handleLogin',(data)=>{
      const {message} = data;
      this.#loginButton.innerHTML = "Logout";
      msg.innerText = message;
      }
    );
    this.#listenToEvent('handleLogout',(event)=>{
      loginBtn.innerHTML = "Login";
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

  async #handleLogin(e){
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

    } catch (error) {
			console.error("Error logging out:",error);
			throw new Error("Error logging out:",error);
		}
  }

  #publishNewTask(task, termInput) {
    this.#hub.publish(task, termInput);
  }

  #listenToEvent(task, method){
    this.#hub.subscribe(task,method);
  }
}
