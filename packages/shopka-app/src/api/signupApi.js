import axiosClient from "./axiosClient";

const signupApi = {
  post: (params) => {
    const { username, password, cfPass } = params;
    const url = `/auth/customer/register`;
    return axiosClient.post(url, { username, password, cfPass });
  },
};

export default signupApi;
