import { EventHub } from "../eventhub/EventHub.js";

class Notes {
	constructor() {
		this.dbName = "notes-db";
		this.storeName = "notes";
		this.initDB();
		this.setupUI();
	}

	async initDB() {
		const request = indexedDB.open(this.dbName, 1);

		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			db.createObjectStore(this.storeName, {
				keyPath: "id",
				autoIncrement: true,
			});
		};

		request.onsuccess = () => {
			console.log("Database initialized");
			this.displayNotes(); // Load notes after DB is initialized
		};

		request.onerror = (event) => {
			console.error("Database error:", event.target.error);
		};
	}

	async addNote(noteContent) {
		const db = await this.getDB();
		const transaction = db.transaction(this.storeName, "readwrite");
		const store = transaction.objectStore(this.storeName);
		const note = { content: noteContent };

		store.add(note);
		transaction.oncomplete = () => {
			console.log("Note added");
			this.displayNotes(); // Refresh the notes display
		};

		transaction.onerror = (event) => {
			console.error("Transaction error:", event.target.error);
		};
	}

	async displayNotes() {
		const db = await this.getDB();
		const transaction = db.transaction(this.storeName, "readonly");
		const store = transaction.objectStore(this.storeName);
		const request = store.getAll();

		request.onsuccess = (event) => {
			const notes = event.target.result;
			const notesContainer = document.getElementById("notes-container");
			notesContainer.innerHTML = notes
				.map((note) => `<div class="note">${note.content}</div>`)
				.join("");
		};

		request.onerror = (event) => {
			console.error("Request error:", event.target.error);
		};
	}

	async getDB() {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.dbName);

			request.onsuccess = (event) => {
				resolve(event.target.result);
			};

			request.onerror = (event) => {
				reject(event.target.error);
			};
		});
	}

	async clearNotes() {
		const db = await this.getDB();
		const transaction = db.transaction(this.storeName, "readwrite");
		const store = transaction.objectStore(this.storeName);

		// Clear all notes from the store
		store.clear();
		transaction.oncomplete = () => {
			console.log("All notes cleared");
			this.displayNotes(); // Refresh the notes display
		};

		transaction.onerror = (event) => {
			console.error("Transaction error:", event.target.error);
		};
	}

	setupUI() {
		const app = document.getElementById("app");
		app.innerHTML = `
			<div>
				<textarea id="note-input"></textarea>
				<button id="add-note">Add Note</button>
				<button id="clear-notes">Clear Notes</button>
				<div id="notes-container"></div>
			</div>
		`;

		document.getElementById("add-note").addEventListener("click", () => {
			const noteInput = document.getElementById("note-input");
			this.addNote(noteInput.value);
			noteInput.value = "";
		});

		document.getElementById("clear-notes").addEventListener("click", () => {
			this.clearNotes(); // Attach clear function
		});
	}
}

export default Notes;
