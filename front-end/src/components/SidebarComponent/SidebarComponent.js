import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { CommentComponent } from "../CommentComponent/CommentComponent.js";

export class SidebarComponent extends BaseComponent {
  #container = null;
  constructor() {
    super();
    this.loadCSS("SidebarComponent");
    // Initialize container as null
    this.container = null;
  }

  /**
   * Creates and returns the sidebar DOM element
   * @returns {HTMLElement} The sidebar container element
   */
  render() {
    if (this.#container) return this.#container;
    this.#createContainer();
    this.#attachEventListeners();
    // Makes and configures the container element if it doesn't exist already
    return this.#container;
  }

  #createContainer() {
    this.#container = document.createElement("div");
    this.#container.id = "sidebar";

    // Sets inital content of the sidebar
    this.#container.innerHTML = `
      <div class="no-course-selected">
        <p>Welcome to the course catalog!</p>

        Click on a course to view its details.
      </div>
    `;
  }
  #attachEventListeners() {
    const hub = EventHub.getInstance();
    hub.subscribe("courseSelect", (course) => this.#showCourseDetails(course));
  }
  /**
   * Updates the sidebar content with the provided course details.
   * function is called when a course node is selected
   * @param {Object} course - The course data to display.
   */
  #showCourseDetails(course) {
    // Formats the prerequisites string
    const prerequisites =
      course.prerequisites.length > 0
        ? course.prerequisites.join(", ")
        : "None";

    // Updates the sidebar content with the course details
    this.#container.innerHTML = `
     <div class="course-details">
        <h2>${course.name}</h2>
        <button id="save-course-button">Save</button>
        <p>${course.description}</p>
        <p>Credits: ${course.credits}</p>
        <p>Prerequisites: ${course.prerequisites.join(", ")}</p>
        <p>Instructors: ${course.instructors}</p>
      </div>
    `;

    // Create and append the CommentsComponent
    const commentComponent = new CommentComponent(course.course_id);
    this.#container.appendChild(commentComponent.render());
  }
}
