// src/api/axios.ts
import axios from 'axios';

// Get the base URL from your .env file
const API_URL = 'http://clearcutoff-main-backend.test/api';

const ENDPOINT = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // withCredentials: true, // Use this if you are using Laravel Sanctum for SPA auth
});

export default ENDPOINT;