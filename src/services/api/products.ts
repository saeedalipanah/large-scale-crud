import axiosInstance from "@/plugins/axios";
import type { ProductInterface } from "@/types/products";

export const productsService = {
  fetchProductsService(params: URLSearchParams) {
    return axiosInstance.get("/products", { params });
  },
  createProductService(formData: ProductInterface) {
    return axiosInstance.post("/products", formData);
  },
  updateProductService(formData: ProductInterface) {
    return axiosInstance.put(`/products/${formData.id}`, formData);
  },
  deleteProductService(id: number) {
    return axiosInstance.delete(`/products/${id}`);
  },
};
