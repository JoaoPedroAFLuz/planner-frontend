import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
});

httpClient.interceptors.response.use(
  async (response) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
