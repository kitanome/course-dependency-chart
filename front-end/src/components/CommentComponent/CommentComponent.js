import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";

export class CommentComponent extends BaseComponent {
  constructor(courseId) {
    super();
    this.courseId = courseId;
    this.comments = [];
    //replace space with underscore
    this.sanitizedId = this.courseId.replace(/\s/g, "_");
  }

  async fetchComments() {
    const response = await fetch(
      `http://localhost:3000/api/courses/${this.sanitizedId}/comments`
    );
    this.comments = await response.json();
  }

  async submitComment(event) {
    event.preventDefault();
    const commentText = event.target.elements.comment.value;
    if (!commentText) {

      // Don't submit empty comments
      return;
    }

    // Submit the comment to the server
    const response = await fetch(`/api/courses/${this.sanitizedId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: commentText }),
    });
    // Submit the comment to the server
    const response = await fetch(
      `http://localhost:3000/api/courses/${this.sanitizedId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: commentText }),
      }
    );

    if (response.ok) {
      const newComment = await response.json();
      this.comments.push(newComment);
      this.renderComments();
    }
  }

  renderComments() {
    const commentsList = this.element.querySelector(".comments-list");
    commentsList.innerHTML = "";
    this.comments.forEach((comment) => {
      const commentItem = document.createElement("li");
      commentItem.textContent = comment.content;
      commentsList.appendChild(commentItem);
    });
  }

  clearComments() {
    fetch(`http://localhost:3000/api/courses/${this.sanitizedId}/comments`, {
      method: "DELETE",
    }).then(() => {
      this.comments = [];
      this.renderComments();
    });
  }

  render() {
    this.element = document.createElement("div");
    this.element.className = "comments-component";

    const bar = document.createElement("hr");
    this.element.appendChild(bar);

    const clearButton = document.createElement("button");
    clearButton.textContent = "Clear comments";
    clearButton.addEventListener("click", () => {
      this.clearComments();
    });
    this.element.appendChild(clearButton);

    const title = document.createElement("h2");
    title.textContent = "Comments";
    this.element.appendChild(title);

    const commentsList = document.createElement("ul");
    commentsList.className = "comments-list";
    this.element.appendChild(commentsList);

    const commentForm = document.createElement("form");
    commentForm.innerHTML = `
      <textarea name="comment" placeholder="Add a comment" required></textarea>
      <button type="submit">Submit</button>
    `;
    // Bind the submitComment method to the current instance
    commentForm.addEventListener("submit", this.submitComment.bind(this));
    this.element.appendChild(commentForm);

    this.fetchComments().then(() => this.renderComments());

    return this.element;
  }
}
