import axiosClient from "./axiosClient";

const settingApi = {
  put: (params) => {
    const {
      customer_name,
      currentPassword,
      password,
      address,
      unit_no,
      postal_code,
      phone,
    } = params;

    const formData = new FormData();
    formData.append("customer_name", customer_name);
    if (currentPassword) {
      formData.append("currentPassword", currentPassword);
    }
    if (password) {
      formData.append("password", password);
    }
    formData.append("address", address);
    formData.append("unit_no", unit_no);
    formData.append("postal_code", postal_code);
    formData.append("phone", phone);

    const url = `/customer/update`;
    return axiosClient.put(url, formData);
  },
  get: (params) => {
    const url = `/customer`;
    return axiosClient.get(url, { params });
  },
};

export default settingApi;
