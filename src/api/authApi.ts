import api from "./axios";

// src/api/authApi.ts

interface LoginData {
  phone: string; // Changed from email/password to phone
}

// FIX: Update this if your registration uses different fields.
interface RegisterData {
  // Example:
  otp: string;
  phone: string;
  // ... other fields
}

export const loginUser = (data: LoginData) => api.post("/v1/auth/login", data);

// FIX: Corrected the typo and applied the RegisterData type.
// The parameter is a single object, not a destructured one.
export const verifyUser = (data: RegisterData) =>
  api.post("/v1/auth/register", data);

export const logoutUser = () => api.post("/v1/logout");
export const verifyOtp = (data: RegisterData) =>
  api.post("/v1/auth/varify-otp", data);
