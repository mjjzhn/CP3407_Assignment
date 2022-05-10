import axios from "axios";
import queryString from "query-string";

// require("dotenv").config();

const axiosClient = axios.create({
  baseURL: `https://flask-pirnfood.herokuapp.com`,
  headers: {
    "Content-Type": "application/json",
    // 'X-Requested-With': 'XMLHttpRequest',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
  },
  (error) => {
    console.log(error);
    throw error;
  }
);

export default axiosClient;
