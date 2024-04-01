import axios from "axios";

axios.defaults.baseURL = "https://cookingapi.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

// Create axios instance for requests
export const axiosReq = axios.create();

// Create axios instance for responses
export const axiosRes = axios.create();
