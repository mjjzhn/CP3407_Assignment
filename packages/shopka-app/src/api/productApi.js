import axiosClient from "./axiosClient";

const productApi = {
  get: (params) => {
    const url = `/menu/items`;
    return axiosClient.get(url, { params });
  },
  put: (params) => {
    const {
      id,
      available,
      is_hot,
      item_base_price,
      item_description,
      item_image_link,
      item_name,
      num_of_item,
      size_plus_price,
      discount,
    } = params;

    const formData = new FormData();

    formData.append("id", id);
    formData.append("available", available);
    formData.append("is_hot", is_hot);
    formData.append("item_base_price", item_base_price);
    formData.append("item_description", item_description);
    if (typeof item_image_link !== "string") {
      formData.append("item_image_link", item_image_link[0]);
    }
    formData.append("item_name", item_name);
    formData.append("num_of_item", num_of_item);
    formData.append("size_plus_price", size_plus_price);
    formData.append("discount", discount);

    const url = `/menu/items/${id}`;
    return axiosClient.put(url, formData);
  },
  post: (params) => {
    const {
      available,
      is_hot,
      item_base_price,
      item_description,
      item_image_link,
      item_name,
      num_of_item,
      prices,
      item_category,
      size_plus_price,
      size_list,
      discount,
    } = params;

    const formData = new FormData();

    formData.append("available", available);
    formData.append("is_hot", is_hot);
    formData.append("item_base_price", item_base_price);
    formData.append("item_description", item_description);
    if (typeof item_image_link !== "string") {
      formData.append("item_image_link", item_image_link[0]);
    }
    formData.append("item_name", item_name);
    formData.append("num_of_item", num_of_item);
    formData.append("item_prices", prices);
    formData.append("item_category", item_category);
    formData.append("size_plus_price", size_plus_price);
    formData.append("size_list", size_list);
    formData.append("discount", discount);

    const url = `/menu/items/create`;
    return axiosClient.post(url, formData);
  },
  delete: (params) => {
    const url = `/menu/items/${params.id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
