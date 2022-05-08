import axiosClient from "./axiosClient";

const orderApi = {
  post: (params) => {
    const { table_number, items } = params;
    const url = `/order/create`;
    return axiosClient.post(url, { table_number, items });
  },
};

export default orderApi;
