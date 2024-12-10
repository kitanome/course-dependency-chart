import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";

export class SaveCourseComponent extends BaseComponent {
  #container = null;
  #hub = null;
  constructor(courseId) {
    super();
    this.courseId = courseId;
    this.#hub = EventHub.getInstance();
    //replace space with underscore
    this.sanitizedId = this.courseId.replace(/\s/g, "_");
  }

  #createContainer() {
    // Create and configure the container element
    this.#container = document.createElement("div");
    this.#container.classList.add("save-course");
    this.#container.innerHTML = this.#getTemplate();
  }

  #getTemplate() {
    // Returns the HTML template for the component
    // Add: onchange="onCheckboxChange(this)"
    return `
    <input type="checkbox" id="save-checkbox" name="save-checkbox" value="saved">
    <label for="vehicle1">Save Course</label><br>
    `;
  }

  render() {
    if (this.#container) {
      return this.#container;
    }
    // Creates container and event listeners for filter
    this.#createContainer();
    //this.#attachEventListeners();
    return this.#container;
  }
}
