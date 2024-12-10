import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";

export class SaveCourseComponent extends BaseComponent {
  #container = null;
  #hub = null;
  #sanitizedId = null;
  constructor(courseId) {
    super();
    this.courseId = courseId;
    this.#hub = EventHub.getInstance();
    //replace space with underscore
    this.#sanitizedId = this.courseId.replace(/\s/g, "_");
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
    <input type="checkbox" id="save-checkbox"">
    <label for="checkbox">Save Course</label><br>
    `;
  }
  #attachEventListeners() {
    const checkbox = this.#container.querySelector("#save-checkbox");
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        console.log(this.#sanitizedId);
        this.#publishNewTask("saveCourse", this.#sanitizedId);
      } else {
        this.#publishNewTask("removeCourse", this.#sanitizedId);
      }
    });
  }

  render() {
    if (this.#container) {
      return this.#container;
    }
    // Creates container and event listeners for course component
    this.#createContainer();
    this.#attachEventListeners();
    return this.#container;
  }

  #publishNewTask(task, termInput) {
    this.#hub.publish(task, termInput);
  }
}
