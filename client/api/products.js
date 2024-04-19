import axios from "axios";

export const productsApi = {
  getProducts: async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/products"
      );
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
      const response = await axios.get(
        import.meta.env.VITE_API_URL + `/products/${id}`
      );
      if (response.data) {
        return response.data[0];
      }
      return;
    } catch (e) {
      console.error(e);
    }
  },
};
