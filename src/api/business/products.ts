import { API } from "../API";

export const getProducts = async (id?: string, productID?: number[]) => {
  const { data } = await API.get("products", {
    params: {
      categories: id ? id : null,
      productId: productID ? productID.join(",") : null,
    },
  });
  return data;
};

export const getProduct = async (id: string) => {
  const { data } = await API.get(`products/${id}`);
  return data;
};
