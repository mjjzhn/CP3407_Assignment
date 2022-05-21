import axiosClient from "./axiosClient";

const paymentApi = {
  post: (params) => {
    const { ...data } = params;
    const url = `/create-payment-intent`;
    return axiosClient.post(
      url,
      { ...data },
      { "Content-Type": "application/json" }
    );
  },
};

export default paymentApi;
