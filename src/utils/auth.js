import { checkResponse } from "./api";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.articlelist.ignorelist.com"
    : "http://localhost:3001";

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      // First, attempt to parse the response as JSON to extract any specific error message
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse.message || `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    // Log the error to the console and then re-throw it to be handled by the calling code
    console.error("Error registering user:", error);
    throw error; // Re-throw to allow the calling function to handle it
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      // Attempt to parse the response as JSON to extract any specific error message
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse.message || `Login failed: Status ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error; // Re-throw the error to allow the calling function to handle it
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }).then(checkResponse);

    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
