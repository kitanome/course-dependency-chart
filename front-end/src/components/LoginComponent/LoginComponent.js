export class LoginComponent {
	constructor() {
		this.loginButton = document.getElementById("login-button");
		this.usernameInput = document.getElementById("username-input");
		this.passwordInput = document.getElementById("password-input");
		this.loginContainer = document.getElementById("login-container");

		this.init();
	}

	init() {
		if (!this.loginButton) {
			console.error("Login button not found!");
			return;
		}

		this.loginButton.addEventListener("click", this.handleLogin.bind(this));
	}

	async handleLogin(e) {
		e.preventDefault();
		console.log("Login button clicked");

		const username = this.usernameInput.value;
		const password = this.passwordInput.value;

		if (!username || !password) {
			alert("Please enter both username and password");
			return;
		}

		try {
			const response = await fetch("http://localhost:3000/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();

			if (response.ok) {
				alert("Login successful!");
				this.loginContainer.style.display = "none";
				// Load courses here
			} else {
				alert(data.error || "Login failed");
			}
		} catch (error) {
			console.error("Login error:", error);
			alert("Error during login");
		}
	}

	render() {
		// If you want to create the login form dynamically in the future
		return this.loginContainer;
	}
}
