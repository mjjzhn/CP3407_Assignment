import axiosClient from "./axiosClient";

const contactApi = {
  post: (params) => {
    const { email, full_name, message } = params;

    const formData = new FormData();

    formData.append("email", email);
    formData.append("full_name", full_name);
    formData.append("message", message);
    const url = `/customer/contact`;
    return axiosClient.post(url, formData);
  },
};

export default contactApi;
