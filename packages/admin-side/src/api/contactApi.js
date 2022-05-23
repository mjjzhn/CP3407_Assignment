import axiosClient from "./axiosClient";

const contactApi = {
  get: (params) => {
    const url = `/admin/contactforms`;
    return axiosClient.get(url, { params });
  },
  delete: (params) => {
    const url = `/admin/contactforms/${params.id}`;
    return axiosClient.delete(url);
  },
};
export default contactApi;
