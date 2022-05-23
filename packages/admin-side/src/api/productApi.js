import axiosClient from "./axiosClient";

const productApi = {
  get: (params) => {
    const url = `/menu/items`;
    return axiosClient.get(url, { params });
  },
  put: (params) => {
    console.log(params);
    const {
      id,
      item_description,
      item_image_link,
      item_name,
      L_stock,
      M_stock,
      XL_stock,
      XXL_stock,
      discount,
      gender,
      top,
      bottom,
      item_price,
      is_hot,
    } = params;

    const formData = new FormData();

    formData.append("item_description", item_description);
    if (typeof item_image_link !== "string") {
      formData.append("item_image_link", item_image_link[0]);
    }
    formData.append("item_name", item_name);
    formData.append("item_price", item_price);
    formData.append("L_stock", L_stock);
    formData.append("M_stock", M_stock);
    formData.append("XL_stock", XL_stock);
    formData.append("XXL_stock", XXL_stock);
    formData.append("discount", discount);
    formData.append("gender", gender);
    formData.append("top", top);
    formData.append("bottom", bottom);
    formData.append("is_hot", is_hot);

    const url = `/menu/items/${id}`;
    return axiosClient.put(url, formData);
  },
  post: (params) => {
    const {
      item_description,
      item_image_link,
      item_name,
      item_price,
      L_stock,
      M_stock,
      XL_stock,
      XXL_stock,
      discount,
      gender,
      top,
      bottom,
      is_hot,
    } = params;

    const formData = new FormData();

    formData.append("item_description", item_description);
    if (typeof item_image_link !== "string") {
      formData.append("item_image_link", item_image_link[0]);
    }
    formData.append("item_name", item_name);
    formData.append("item_price", item_price);
    formData.append("L_stock", L_stock);
    formData.append("M_stock", M_stock);
    formData.append("XL_stock", XL_stock);
    formData.append("XXL_stock", XXL_stock);
    formData.append("discount", discount);
    formData.append("gender", gender);
    formData.append("top", top);
    formData.append("bottom", bottom);
    formData.append("is_hot", is_hot);

    const url = `/menu/items/create`;
    return axiosClient.post(url, formData);
  },
  delete: (params) => {
    const url = `/menu/items/${params.id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
