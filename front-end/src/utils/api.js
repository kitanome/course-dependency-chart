const API_URL = "http://localhost:3000/api";

export async function fetchCourses() {
	try {
		const response = await fetch(`${API_URL}/courses`);
		if (!response.ok) throw new Error("Failed to fetch courses");
		return await response.json();
	} catch (error) {
		console.error("Error:", error);
		return [];
	}
}

export async function login(username, password) {
	try {
		console.log("Sending login request with:", { username, password }); // Log what we're sending

		const response = await fetch(`${API_URL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});

		// Log the raw response
		const responseText = await response.text();
		console.log("Raw response:", responseText);

		// Try to parse it as JSON
		let data;
		try {
			data = JSON.parse(responseText);
		} catch (e) {
			console.error("Failed to parse response as JSON:", e);
			throw new Error("Invalid response from server");
		}

		if (!response.ok) {
			throw new Error(data.error || "Login failed");
		}

		return data;
	} catch (error) {
		console.error("Login error:", error);
		throw error;
	}
}
