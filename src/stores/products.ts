import type { ProductInterface } from "@/types/products";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductsStore = defineStore("products", () => {
  const products = ref<ProductInterface[]>([]);
  const totalProducts = ref<number>(0);
  const setProducts = (newProducts: ProductInterface[]) => {
    products.value = newProducts;
  };

  const setTotalProducts = (newTotalProducts: number) => {
    totalProducts.value = newTotalProducts;
  };
  return {
    products,
    setProducts,
    totalProducts,
    setTotalProducts,
  };
});
