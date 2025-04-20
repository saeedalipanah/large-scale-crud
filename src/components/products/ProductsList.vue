<template>
  <div>
    <BaseCard>
      <template #card-header>
        <TableInformationHeader
          :page="page"
          :per-page="perPage"
          :total-items="totalProducts"
          :is-loading="isFetchingProducts"
          title="PRODUCTS"
          add-new-button-text="Add New Product"
          @on-add-new-click="openAddModal"
        />
        <ProductFilters
          :category-options="categoryOptions"
          @on-set-filter-params="setFilterParams"
          @on-do-filter="getProducts"
        />
      </template>
      <template #card-content>
        <template v-if="products.length">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  v-for="header in headers"
                  :key="header.key"
                  :class="header.sortable ? 'cursor-pointer' : ''"
                  class="w-[150px]"
                  @click="header.sortable ? handleSort(header.key) : null"
                >
                  <div class="flex items-center gap-1">
                    <span>{{ header.label }}</span>

                    <div v-if="header.sortable" class="flex flex-col">
                      <ChevronUp
                        class="w-4 -mb-4"
                        :class="`
                          ${sortBy === header.key && orderBy === 'asc' ? 'text-green-500' : 'text-muted'}
                        `"
                      />
                      <ChevronDown
                        class="w-4 -mb-1"
                        :class="`
                          ${sortBy === header.key && orderBy === 'desc' ? 'text-red-500' : 'text-muted'}
                        `"
                      />
                    </div>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="product in products" :key="product.id">
                <TableCell :class="tableCellClasses('title')">{{
                  product.title
                }}</TableCell>
                <TableCell :class="tableCellClasses('category')">{{
                  categoryOptions.find(
                    (category) => category.value === product.category
                  )?.label
                }}</TableCell>
                <TableCell :class="tableCellClasses('price')"
                  >${{ product.price }}</TableCell
                >
                <TableCell :class="tableCellClasses('stock')">{{
                  product.stock
                }}</TableCell>
                <TableCell :class="tableCellClasses('rating')">{{
                  product.rating
                }}</TableCell>
                <TableCell :class="tableCellClasses('date')">{{
                  convertDateStringToLocaleDate(product.date as string)
                }}</TableCell>
                <TableCell>
                  <div class="flex gap-2">
                    <BaseButton
                      variant="ghost"
                      size="sm"
                      @click="openEditModal(product)"
                    >
                      <Pencil class="w-4 h-4" />
                    </BaseButton>
                    <BaseButton
                      variant="ghost"
                      size="sm"
                      @click="openDeleteModal(product)"
                    >
                      <Trash2 class="w-4 h-4" />
                    </BaseButton>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </template>
        <div v-else class="h-[632px] flex items-center justify-center">
          <h2 class="text-xl font-semibold text-muted-foreground">
            No products found
          </h2>
        </div>
      </template>
      <template #card-footer>
        <div class="mx-auto">
          <BasePagination
            :page="page"
            :total="totalProducts"
            :per-page="perPage"
            @on-page-change="handlePageChange"
          />
        </div>
      </template>
    </BaseCard>

    <BaseDialog
      v-model="isModalOpen"
      :title="isEditing ? 'Edit Product' : 'Add Product'"
      :description="
        isEditing
          ? 'Update the product details'
          : 'Complete the form to add a new product'
      "
      @close="resetForm"
    >
      <template #content>
        <ProductForm
          ref="productFormRef"
          :product="selectedProduct"
          :category-options="categoryOptions"
        />
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <BaseButton
            :disabled="isSubmittingProduct"
            variant="outline"
            class="w-20"
            @click="isModalOpen = false"
            >Cancel</BaseButton
          >
          <BaseButton
            :loading="isSubmittingProduct"
            class="w-20"
            @click="submitProductForm"
            >{{ isEditing ? "Update" : "Add" }}</BaseButton
          >
        </div>
      </template>
    </BaseDialog>
    <BaseConfirmationDialog
      v-model="isDeleteModalOpen"
      :cancel-disabled="isSubmittingProduct"
      :accept-loading="isSubmittingProduct"
      :accept-disabled="isSubmittingProduct"
      title="Delete Product"
      description="Are you sure you want to delete this product?"
      @on-cancel="isDeleteModalOpen = false"
      @on-accept="submitDeleteForm"
    />
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from "@/stores/products";
import { onMounted, ref, computed, type Ref } from "vue";
import { ChevronUp, ChevronDown, Pencil, Trash2 } from "lucide-vue-next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import BaseButton from "@/components/common/BaseComponents/BaseButton.vue";
import ProductForm from "@/components/products/ProductForm.vue";
import ProductFilters from "@/components/products/ProductFilters.vue";
import TableInformationHeader from "@/components/products/TableInformationHeader.vue";
import { useApiRequest } from "@/composables/common/useApiRequests";
import { productsService } from "@/services/api/products";
import { useProductForm } from "@/composables/products/useProductActions";
import { convertDateStringToLocaleDate } from "@/composables/common/useDateFormatter";
import { useRoute, useRouter } from "vue-router";
import type { ProductInterface } from "@/types/products";

const productsStore = useProductsStore();
const products = computed<ProductInterface[]>(() => productsStore.products);
const totalProducts = computed<number>(() => productsStore.totalProducts);

//Set Sort
const sortBy = ref<string | null>(null);
const orderBy = ref<"asc" | "desc" | null>(null);
const handleSort = (field: string) => {
  resetPagination();
  if (sortBy.value !== field) {
    setSortBy(field);
    setOrderBy("asc");
  } else {
    setOrderBy(
      orderBy.value === "asc" ? "desc" : orderBy.value === "desc" ? null : "asc"
    );
  }
  getProducts();
};
const setSortBy = (field: string | null) => {
  sortBy.value = field;
};
const setOrderBy = (order: "asc" | "desc" | null) => {
  orderBy.value = order;
};

const reloadSortBasedOnQueryParams = (query: Record<string, string>) => {
  if (query._sort) {
    setSortBy(query._sort);
  }
  if (query._order) {
    setOrderBy(query._order.toLowerCase() as "asc" | "desc");
  }
};

//Set Filters
const filterParams = ref<URLSearchParams>();
const setFilterParams = (params: URLSearchParams) => {
  filterParams.value = params;
  resetPagination();
};

//Set Pagination
const page = ref(1);
const perPage = ref(8);
const handlePageChange = (newPage: number) => {
  page.value = newPage;
  getProducts();
};
const resetPagination = () => {
  page.value = 1;
};
const reloadPageBasedOnQueryParams = (query: Record<string, string>) => {
  if (query._page) {
    page.value = +query._page;
  }
};

const router = useRouter();
const {
  responseData,
  sendRequest,
  isLoading: isFetchingProducts,
  error,
} = useApiRequest();
const getProducts = async () => {
  const params = new URLSearchParams({
    _page: page.value > 0 ? page.value.toString() : "1",
    _limit: perPage.value.toString(),
  });
  if (sortBy.value && orderBy.value) {
    params.append("_sort", sortBy.value);
    params.append("_order", orderBy.value.toUpperCase());
  } else {
    params.append("_sort", "id");
    params.append("_order", "desc");
  }
  if (filterParams.value) {
    for (const [key, value] of filterParams.value.entries()) {
      params.append(key, value);
    }
  }

  router.replace({
    query: Object.fromEntries(params),
  });

  await sendRequest(productsService.fetchProductsService(params));
  if (!error?.value) {
    productsStore.setProducts(responseData.value.data);
    productsStore.setTotalProducts(
      parseInt(responseData.value.headers["x-total-count"])
    );
  }
};

//Product Actions
const productFormRef = ref<InstanceType<typeof ProductForm>>();
const {
  openAddModal,
  openEditModal,
  resetForm,
  isModalOpen,
  isEditing,
  selectedProduct,
  submitProductForm,
  categoryOptions,
  isSubmittingProduct,
  isDeleteModalOpen,
  openDeleteModal,
  submitDeleteForm,
} = useProductForm({
  page,
  productFormRef: productFormRef as Ref<InstanceType<typeof ProductForm>>,
  reloadProductsList: getProducts,
});

const route = useRoute();
onMounted(async () => {
  const query = route.query as Record<string, string>;
  if (Object.keys(query).length > 0) {
    reloadSortBasedOnQueryParams(query);
    reloadPageBasedOnQueryParams(query);
  }
  await getProducts();
});

const headers = [
  { key: "title", label: "Name", sortable: true },
  { key: "category", label: "Category", sortable: true },
  { key: "price", label: "Price", sortable: true },
  { key: "stock", label: "Stock", sortable: true },
  { key: "rating", label: "Rating", sortable: true },
  { key: "date", label: "Date", sortable: true },
  { key: "actions", label: "Actions", sortable: false },
];
const tableCellClasses = (cellName: string) => {
  return [
    {
      "bg-destructive-foreground":
        sortBy.value === cellName && orderBy.value === "desc",
    },
    {
      "bg-success-foreground":
        sortBy.value === cellName && orderBy.value === "asc",
    },
  ];
};
</script>
