import axios from "axios";

const axiosInstance = axios.create(); // Create a new instance of axios

// we can hardCode the base URL(backened base URL)
axiosInstance.defaults.baseURL = import.meta.env.VITE_BACKEND_URL; // Set the base URL

axiosInstance.defaults.withCredentials = true; // Allow cookies to be sent with requests(signed user having token in cookies hence we have to sent cookies in each request to interact with backened)

export default axiosInstance;