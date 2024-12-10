import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class LoginComponent extends BaseComponent{
	#loginButton = null;
	#usernameInput = null;
	#passwordInput = null;
	#loginContainer = null;
	#loggedIn = false;
	constructor() {
		super();
		// this.#loginButton = document.getElementById("login-button");
		// this.#usernameInput = document.getElementById("username-input");
		// this.#passwordInput = document.getElementById("password-input");
		// this.#loginContainer = document.getElementById("login-container");

		// this.init();
		this.loadCSS('LoginComponent');
	}

	// init() {
	// 	if (!this.#loginButton) {
	// 		console.error("Login button not found!");
	// 		return;
	// 	}

	// 	// this.#loginButton.addEventListener("click", this.handleLogin.bind(this));
	// }

	render() {
		if (this.#loggedIn){
			return this.#loginContainer;
		}
		this.#createContainer();
		this.#attachEventListener();
		return this.#loginContainer;
	}

	#createContainer(){
		this.#loginContainer = document.createElement("div");
		this.#loginContainer.id = "login-container";

		const form = document.createElement("form");
		form.id = "login-form";

		// Username input group
		const usernameGroup = document.createElement("div");
		usernameGroup.className = "form-group";
		this.#usernameInput = document.createElement("input");
		this.#usernameInput.type = "text";
		this.#usernameInput.id = "username-input";
		this.#usernameInput.placeholder = "Username";
		usernameGroup.appendChild(this.#usernameInput);

		// Password input group
		const passwordGroup = document.createElement("div");
		passwordGroup.className = "form-group";
		this.#passwordInput = document.createElement("input");
		this.#passwordInput.type = "password";
		this.#passwordInput.id = "password-input";
		this.#passwordInput.placeholder = "Password";
		passwordGroup.appendChild(this.#passwordInput);

		// Login button
		this.#loginButton = document.createElement("button");
		this.#loginButton.id = "login-button";
		this.#loginButton.textContent = "Login";

		// Message container
		const messageDiv = document.createElement("div");
		messageDiv.id = "login-message";

		// Append all elements
		form.appendChild(usernameGroup);
		form.appendChild(passwordGroup);
		form.appendChild(this.#loginButton);
		form.appendChild(messageDiv);
		this.#loginContainer.appendChild(form);
	}

	#attachEventListener(){
		this.#loginButton.addEventListener("click", this.handleLogin.bind(this));
	}

	async handleLogin(e) {
		e.preventDefault();
		console.log("Login button clicked");

		const username = this.#usernameInput.value;
		const password = this.#passwordInput.value;

		if (!username || !password) {
			alert("Please enter both username and password");
			return;
		}

		try {
			const response = await fetch("http://localhost:3000/api/login/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();

			if (response.ok) {
				alert("Login successful!");
				this.#loginContainer.style.display = "none";
				// Load courses here
			} else {
				alert(data.error || "Login failed");
			}
		} catch (error) {
			console.error("Login error:", error);
			alert("Error during login");
		}
	}

	async handlePersistence(){
		try {
			let response = await fetch("http://localhost:3000/api/profile", {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			})

			if (!response.ok){
				return true;
			}
			return false;
		} catch (error) {
			console.error("Error fetching profile data:",error);
			throw new Error("Error fetching profile data:",error);
		}



	}
}
