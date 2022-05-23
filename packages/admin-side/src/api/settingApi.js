import axiosClient from "./axiosClient";

const settingApi = {
  put: (params) => {
    const { staffname, currentPassword, password, username, picture } = params;

    const formData = new FormData();
    formData.append("staffname", staffname);
    formData.append("currentPassword", currentPassword);
    formData.append("password", password);
    formData.append("username", username);
    formData.append("avatar", picture[0]);

    const url = `/admin/update`;
    return axiosClient.put(url, formData);
  },
};

export default settingApi;
