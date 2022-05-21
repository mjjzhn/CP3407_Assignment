import axiosClient from "./axiosClient";

const loginApi = {
  post: (params) => {
    const { username, password } = params;
    const url = `/auth/customer/token`;
    return axiosClient.post(url, { username, password });
  },
};

export default loginApi;
