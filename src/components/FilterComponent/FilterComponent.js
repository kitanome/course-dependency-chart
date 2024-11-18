import { BaseComponent } from "../BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";

export class FilterComponent extends BaseComponent {
  #container = null;
  #graph = null;

  constructor(filterData = {}) {
    super();
    this.taskData = filterData;
    this.loadCSS("FilterComponent");
  }

  render() {
    if (this.#container) {
      return this.#container;
    }

    this.#createContainer();
    this.#createGraph();
    this.#attachEventListeners();
    return this.#container;
  }

  #createContainer() {
    // Create and configure the container element
    this.#container = document.createElement("div");
    this.#container.classList.add("filter-input");
    this.#container.innerHTML = this.#getTemplate();
  }

  #createGraph() {
    this.#graph = document.getElementById("graph");
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

    const textNodes = this.#graph.querySelectorAll("text");
    textNodes.forEach((text) => {
      console.log(text.textContent);
      if (text.textContent.toLowerCase().includes(term.toLowerCase()) && term) {
        // Highlight matching text
        text.setAttribute("fill", "yellow"); // Change text color
        text.setAttribute("stroke", "yellow"); // Add an outline
        console.log(text);
      } else {
        // Reset styling for non-matching text
        text.setAttribute("fill", "black"); // Default text color
        text.setAttribute("stroke", "none"); // Remove outline
      }
    });
  }
}
