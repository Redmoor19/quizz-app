import axios from "axios";

const baseUrl = "https://opentdb.com";

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.response.use(
  (res) => {
    if (res.status.toString().startsWith("2")) {
      return res.data;
    } else {
      return Promise.reject({
        message: `Unexpected status code: ${res.status}`,
        status: res.status,
        data: res.data,
      });
    }
  },
  (err) => {
    if (err.response) {
      return Promise.reject({
        message: `Error: ${err.response.statusText || "Unknown error"}`,
        status: err.response.status,
        data: err.response.data,
      });
    } else if (err.request) {
      return Promise.reject({
        message:
          "No response received from the server. Please try again later.",
        request: err.request,
      });
    } else {
      return Promise.reject({
        message: `Request error: ${err.message}`,
        config: err.config,
      });
    }
  }
);

export default api;
