import axiosClient from "./axiosClient";

const favoriteApi = {
  get: (params) => {
    const url = `/customer/favourite`;
    return axiosClient.get(url, { params });
  },
  delete: (params) => {
    const url = `/customer/favourite/${params.id}`;
    return axiosClient.delete(url);
  },
  post: (params) => {
    const url = `/customer/favourite/${params.id}`;
    return axiosClient.post(url);
  },
};

export default favoriteApi;
