import axios from "axios";
import type { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401: // Unauthorized
          console.error("Unauthorized: Your is not authenticated.");
          break;

        case 403: // Forbidden
          console.error("Forbidden: You do not have access.");
          break;

        case 500: // Internal Server Error
          console.error("Server error: Please try again later.");
          break;

        default:
          console.error(`Error: ${error.response.statusText}`);
      }
    } else {
      console.error("Network error or server is unreachable.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
