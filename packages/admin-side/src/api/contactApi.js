import axiosClient from "./axiosClient";

const contactApi = {
  get: (params) => {
    const url = `/admin/contactforms`;
    return axiosClient.get(url, { params });
  }
}
export default contactApi;