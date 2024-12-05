import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";

export class FilterComponent extends BaseComponent {
  #container = null;

  constructor(filterData = {}) {
    super();
    this.taskData = filterData;
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
    this.#container.classList.add("filter-input");
    this.#container.innerHTML = this.#getTemplate();
  }

  #getTemplate() {
    // Returns the HTML template for the component
    return `
      <input type="text" id="filterInput" placeholder="Add filter">
      <button id="filterBtn">Filter</button>
    `;
  }

  #attachEventListeners() {
    // Attach event listeners to the input and button elements
    const filterBtn = this.#container.querySelector("#filterBtn");
    const filterInput = this.#container.querySelector("#filterInput");

    filterBtn.addEventListener("click", () => this.#handleFilter(filterInput));
  }

  #handleFilter(filterInput) {
    const term = filterInput.value;

    if (!term) {
      alert("Please enter a filter.");
      return;
    }
    this.#publishNewTask("filter", term);
  }

  #publishNewTask(task, termInput) {
    const hub = EventHub.getInstance();
    hub.publish(task, termInput);
  }
}
