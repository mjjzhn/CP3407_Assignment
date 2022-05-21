import axiosClient from "./axiosClient";

const signupApi = {
  post: (params) => {
    const { username, password } = params;
    const url = `/auth/customer/register`;
    return axiosClient.post(url, { username, password });
  },
};

export default signupApi;
