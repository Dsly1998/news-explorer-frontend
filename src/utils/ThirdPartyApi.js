// const API_KEY = '7d5aa8655b694d14aef74cac887fb786'; // Replace with your actual API key
// const BASE_URL = 'https://newsapi.org/v2';
// const PROXY_URL = 'https://nomoreparties.co/news/v2';
// const AUTH_API_URL = 'https://your-backend.com/api'; // Replace with your backend API URL

// const fetchNews = async (query, from, to, useProxy = false, pageSize = 100) => {
//   // ... existing fetchNews function ...
// };

// const loginUser = async (email, password) => {
//   try {
//     const response = await fetch(`${AUTH_API_URL}/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) {
//       throw new Error('Login failed');
//     }

//     return await response.json(); // This should contain the token and user details
//   } catch (error) {
//     console.error('Login error:', error);
//     throw error;
//   }
// };

// const registerUser = async (email, password, username) => {
//   try {
//     const response = await fetch(`${AUTH_API_URL}/register`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password, username }),
//     });

//     if (!response.ok) {
//       throw new Error('Registration failed');
//     }

//     return await response.json(); // This should contain confirmation details
//   } catch (error) {
//     console.error('Registration error:', error);
//     throw error;
//   }
// };

// export { fetchNews, loginUser, registerUser };
