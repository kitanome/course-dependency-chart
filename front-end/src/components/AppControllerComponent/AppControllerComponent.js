import { FilterComponent } from "../FilterComponent/FilterComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";

export class AppControllerComponent {
  #container = null; // Private container for the component
  #filterComponent = null; // Instance of the filter component
  #hub = null; // EventHub instance for managing events

  constructor() {
    this.#hub = EventHub.getInstance();
    this.#filterComponent = new FilterComponent();
  }

  render() {
    this.#createContainer();

    this.#container.appendChild(this.#filterComponent.render());
    return this.#container;
  }

  #createContainer() {
    this.#container = document.createElement("div");
    this.#container.classList.add("app-controller");
    this.#container.appendChild(this.#filterComponent.render());
  }
}
