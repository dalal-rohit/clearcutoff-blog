// src/api/axios.ts
import axios from 'axios';

// Get the base URL from your .env file
const API_URL = process.env.API_URL || 'https://apptest.clearcutoff.in/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // withCredentials: true, // Use this if you are using Laravel Sanctum for SPA auth
});

export default api;