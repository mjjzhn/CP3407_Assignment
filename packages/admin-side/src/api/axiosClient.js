import axios from "axios";
import queryString from "query-string";

require("dotenv").config();

const axiosClient = axios.create({
  baseURL: `https://flask-shopka.herokuapp.com`,
  headers: {
    "Content-Type": "application/json",
    // 'X-Requested-With': 'XMLHttpRequest',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
