import axios from "axios";

const API = axios.create({
  baseURL: "https://todu.mn/bs/lms/open-api-catalog/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Export both default and named for compatibility
export default API;
export { API };
