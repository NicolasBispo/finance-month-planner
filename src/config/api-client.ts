import axios from "axios";
import { Agent } from "https";
import { getCookie, deleteCookie } from "cookies-next";
import { API_URL } from "./constants";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  httpsAgent: new Agent({ rejectUnauthorized: false }),
});

apiClient.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      const token = getCookie("token");
      if (token) {
        deleteCookie("token");
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
