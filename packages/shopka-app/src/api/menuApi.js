import axiosClient from "./axiosClient";
 
const menuApi = {
  get: (params) => {
    const url = `/menu/items`;
    return axiosClient.get(url, { params });
  },
};

export default menuApi;
