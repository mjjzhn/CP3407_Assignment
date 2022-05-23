import axiosClient from "./axiosClient";

const orderApi = {
  get: (params) => {
    const url = `/order`;
    return axiosClient.get(url, { params });
  },
  put: (params) => {
    const url = `/order/${params.orderId}/nextStep`;
    return axiosClient.put(url);
  },
  delete: (params) => {
    const url = `/order/${params.orderId}`;
    return axiosClient.delete(url);
  },
};

export default orderApi;
