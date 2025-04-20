import type ProductForm from "@/components/products/ProductForm.vue";
import type { ProductInterface } from "@/types/products";
import { computed, ref, type Ref } from "vue";
import { useApiRequest } from "../common/useApiRequests";
import { productsService } from "@/services/api/products";
import { useProductsStore } from "@/stores/products";
import { useToast } from "@/components/ui/toast";

export function useProductForm({
  page,
  productFormRef,
  reloadProductsList,
}: {
  page: Ref<number>;
  productFormRef: Ref<InstanceType<typeof ProductForm>>;
  reloadProductsList?: () => void;
}) {
  const productsStore = useProductsStore();
  const products = computed<ProductInterface[]>(() => productsStore.products);
  const selectedProduct = ref<ProductInterface | undefined>(undefined);
  const isModalOpen = ref(false);
  const isEditing = ref(false);
  const openAddModal = () => {
    isEditing.value = false;
    selectedProduct.value = undefined;
    isModalOpen.value = true;
  };

  const openEditModal = (product: ProductInterface) => {
    isEditing.value = true;
    selectedProduct.value = { ...product };
    isModalOpen.value = true;
  };

  const resetForm = () => {
    isEditing.value = false;
    selectedProduct.value = undefined;
  };

  const {
    responseData,
    sendRequest,
    isLoading: isSubmittingProduct,
    error,
  } = useApiRequest();
  const submitProductForm = async () => {
    const formData = productFormRef.value?.getFormData();
    if (formData) {
      if (isEditing.value) {
        await updateProduct(formData);
      } else {
        await createProduct(formData);
      }
    }
  };

  const { toast } = useToast();
  const updateProduct = async (productInformation: ProductInterface) => {
    await sendRequest(productsService.updateProductService(productInformation));
    if (!error?.value) {
      const productIndex = products.value.findIndex(
        (product) => product.id === productInformation.id
      );
      if (productIndex !== -1) {
        products.value[productIndex] = responseData.value.data;
      }
      toast({
        title: "Success",
        description: "Product updated successfully",
        variant: "success",
        duration: 4000,
      });
      isModalOpen.value = false;
    }
  };

  const createProduct = async (productInformation: ProductInterface) => {
    await sendRequest(productsService.createProductService(productInformation));
    if (!error?.value) {
      isModalOpen.value = false;
      toast({
        title: "Success",
        description: "Product created successfully",
        variant: "success",
        duration: 4000,
      });
      reloadProductsList?.();
    }
  };

  const isDeleteModalOpen = ref(false);
  const openDeleteModal = (product: ProductInterface) => {
    isDeleteModalOpen.value = true;
    selectedProduct.value = product;
  };

  const submitDeleteForm = async () => {
    if (selectedProduct.value?.id) {
      await sendRequest(
        productsService.deleteProductService(selectedProduct.value?.id)
      );
      if (!error?.value) {
        isDeleteModalOpen.value = false;
        toast({
          title: "Success",
          description: "Product deleted successfully",
          variant: "success",
          duration: 4000,
        });
        if (products.value.length === 1 && page.value > 1) {
          page.value--;
        }
        reloadProductsList?.();
      }
    }
  };

  const categoryOptions = [
    { label: "Electronics", value: "Electronics" },
    { label: "Wearables", value: "Wearables" },
    { label: "Food & Beverages", value: "FoodAndBeverages" },
    { label: "Photography", value: "Photography" },
    { label: "Fitness", value: "Fitness" },
    { label: "Accessories", value: "Accessories" },
    { label: "Home", value: "Home" },
    { label: "Kitchen", value: "Kitchen" },
    { label: "Nutrition", value: "Nutrition" },
    { label: "Sports", value: "Sports" },
    { label: "Books", value: "Books" },
    { label: "Music", value: "Music" },
    { label: "Movies", value: "Movies" },
    { label: "Gaming", value: "Gaming" },
    { label: "Toys", value: "Toys" },
    { label: "Beauty", value: "Beauty" },
    { label: "Health", value: "Health" },
    { label: "Office", value: "Office" },
    { label: "Pets", value: "Pets" },
    { label: "Garden", value: "Garden" },
  ];

  return {
    isModalOpen,
    isEditing,
    openAddModal,
    openEditModal,
    resetForm,
    selectedProduct,
    submitProductForm,
    categoryOptions,
    isSubmittingProduct,
    isDeleteModalOpen,
    openDeleteModal,
    submitDeleteForm,
  };
}
