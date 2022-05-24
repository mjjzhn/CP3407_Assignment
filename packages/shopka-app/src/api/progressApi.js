import axiosClient from "./axiosClient";

const progressingApi = {
  get: (params) => {
    const url = `/customer/orders`;
    return axiosClient.get(url, { params });
  },
};

export default progressingApi;
