import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";

export class NavbarComponent extends BaseComponent {
  #container = null;

  constructor(navData = {}) {
    super();
    this.navData = navData;
    this.loadCSS("FilterComponent");
  }

  render() {
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
    this.#container.classList.add("login-input");
    this.#container.innerHTML = this.#getTemplate();
  }

  #getTemplate() {
    // Returns the HTML template for the component
    return `
      <input type="text" id="loginInput" placeholder="Login">
      <button id="loginBtn">Filter</button>
    `;
  }

  #attachEventListeners() {
    // Attach event listeners to the input and button elements
    const filterBtn = this.#container.querySelector("#loginBtn");
    const filterInput = this.#container.querySelector("#loginInput");

    filterBtn.addEventListener("click", () => this.#handleLogin());
  }

  #handleLogin() {
    const term = filterInput.value;
    this.#publishNewTask("HandleRoute", "login");
  }

  #publishNewTask(task, termInput) {
    const hub = EventHub.getInstance();
    hub.publish(task, termInput);
  }
}
