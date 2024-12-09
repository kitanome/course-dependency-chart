export class LoginComponent {
    constructor() {
        this.container = document.createElement('div');
        this.container.id = 'login-container';
    }

    async handleLogin(username, password) {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.showMessage('Login successful!', false);
                this.hide();
                return true;
            } else {
                this.showMessage(data.error || 'Login failed', true);
                return false;
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showMessage('Error during login', true);
            return false;
        }
    }

    showMessage(message, isError = false) {
        const messageElement = this.container.querySelector('#login-message');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.style.color = isError ? 'red' : 'green';
        }
    }

    hide() {
        this.container.style.display = 'none';
    }

    show() {
        this.container.style.display = 'block';
    }

    render() {
        this.container.innerHTML = `
            <div id="login-form">
                <h2>Login</h2>
                <div class="form-group">
                    <input type="text" id="username-input" placeholder="Username">
                </div>
                <div class="form-group">
                    <input type="password" id="password-input" placeholder="Password">
                </div>
                <button id="login-button">Login</button>
                <div id="login-message"></div>
            </div>
        `;

        // Add event listener
        const loginButton = this.container.querySelector('#login-button');
        loginButton.addEventListener('click', async () => {
            const username = this.container.querySelector('#username-input').value;
            const password = this.container.querySelector('#password-input').value;

            if (!username || !password) {
                this.showMessage('Please enter both username and password', true);
                return;
            }

            const success = await this.handleLogin(username, password);
            if (success) {
                // Dispatch a custom event that login was successful
                const event = new CustomEvent('loginSuccess');
                document.dispatchEvent(event);
            }
        });

        return this.container;
    }
}
