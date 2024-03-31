import axios from "axios";

axios.defaults.baseURL = "https://cookingapi.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

// Create axios instance for requests
export const axiosReq = axios.create();

// Create axios instance for responses
export const axiosRes = axios.create();

// Request interceptor for axiosReq
axiosReq.interceptors.request.use(
  async (config) => {
    try {
      return config;
    } catch (err) {
      // Handle error (e.g., token refresh failed)
      console.error("Request interceptor error", err);
      return Promise.reject(err);
    }
  },
  (err) => {
    // Handle request error
    console.error("Request interceptor error", err);
    return Promise.reject(err);
  }
);

axiosRes.interceptors.response.use(
    (response) => response,
    async (err) => {
      if (err.response?.status === 401) {
        try {
          // Refresh token before retrying the original request
          await axios.post("/dj-rest-auth/token/refresh/");
          // Retry the original request
          return axiosRes(err.config);
        } catch (refreshError) {
          // Handle error (e.g., token refresh failed)
          console.error("Response interceptor error - Token refresh failed", refreshError);
          return Promise.reject(refreshError);
        }
      }
      // Handle other response errors
      console.error("Response interceptor error", err.response?.status, err.response?.data);
      return Promise.reject(err);
    }
  );