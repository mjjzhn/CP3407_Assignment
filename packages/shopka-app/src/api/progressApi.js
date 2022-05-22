import axiosClient from "./axiosClient";

const progressingApi = {
  get: (params) => {
    const { id } = params;
    const url = `/order/${id}`;
    return axiosClient.get(url);
  },
};

export default progressingApi;
