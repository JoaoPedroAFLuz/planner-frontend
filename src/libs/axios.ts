import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
});
