import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL + "/products";

export const productsApi = {
  getProducts: async () => {
    try {
      const response = await axios.get(BASE_URL);
      if (response.data) {
        return response.data;
      }
      return [];
    } catch (e) {
      console.error(e);
    }
  },
  getProductById: async (id) => {
    try {
      const response = await axios.get(BASE_URL + `/${id}`);
      if (response.data) {
        return response.data[0];
      }
      return;
    } catch (e) {
      console.error(e);
    }
  },
  createProduct: async (product) => {
    try {
      return await axios.post(BASE_URL, product);
    } catch (e) {
      console.error(e);
    }
  },
  updateProduct: async (product) => {
    try {
      return await axios.put(BASE_URL + `/${product.productId}`, product);
    } catch (e) {
      console.error(e);
    }
  },
  deleteProduct: async (id) => {
    try {
      return await axios.delete(BASE_URL + `/${id}`);
    } catch (e) {
      console.error(e);
    }
  },
};
