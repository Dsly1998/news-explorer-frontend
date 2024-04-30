import { checkResponse } from "./api";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.articlelist.ignorelist.com"
    : "http://localhost:3001";

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    const errorMessage =
      errorResponse.message || `HTTP error! Status: ${response.status}`;
    throw new Error(errorMessage);
  }

  return await response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    const errorMessage =
      errorResponse.message || `Login failed: Status ${response.status}`;
    throw new Error(errorMessage);
  }

  return await response.json();
};

export const getUserProfile = async (token) => {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);

  return await response.json();
};
