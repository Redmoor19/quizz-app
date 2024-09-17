import axios from "axios";

const baseUrl = "https://opentdb.com";

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.response.use(
  (res) => {
    if (res.status.toString().startsWith("2")) {
      return res.data;
    }
  },
  (err) => {
    console.log(err.message);
    if (err) return err.message;
  }
);

export default api;
