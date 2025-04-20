<template>
  <div class="filters w-full grid grid-cols-12 gap-4">
    <BaseInput
      type="text"
      v-model.trim="searchQuery"
      placeholder="Search by title..."
      class="col-span-12 sm:col-span-6 md:col-span-3"
      id="product-filters-search"
      @update:model-value="handleSearch"
    />
    <BaseSelect
      v-model="selectedCategory"
      :items="categoryOptions"
      placeholder="Filter by category"
      class="col-span-12 sm:col-span-6 md:col-span-3"
      id="product-filters-category"
      @update:model-value="handleCategoryChange"
    />
    <BaseRangeDatePicker
      v-model:startDate="startDate"
      v-model:endDate="endDate"
      placeholder="Filter by date"
      class="col-span-12 sm:col-span-6 md:col-span-3"
      id="product-filters-date"
    />
    <div class="col-span-12 sm:col-span-6 md:col-span-3">
      <div class="flex items-center justify-between gap-4 mb-2">
        <span class="text-sm text-muted-foreground">Filter by price</span>
        <span class="text-sm text-muted-foreground"
          >${{ minPrice }} - ${{ maxPrice }}</span
        >
      </div>
      <Slider
        v-model="priceRange"
        :min="initialMinPrice"
        :max="initialMaxPrice"
        :step="1"
        class="w-full"
        id="product-filters-price"
        @pointerup="handlePriceChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, type PropType, onMounted } from "vue";
import { Slider } from "@/components/ui/slider";
import BaseRangeDatePicker from "@/components/common/BaseComponents/BaseRangeDatePicker.vue";
import type { DateRange } from "reka-ui";
import { useRoute } from "vue-router";
import { CalendarDate } from "@internationalized/date";

defineProps({
  categoryOptions: {
    type: Array as PropType<{ label: string; value: string }[]>,
    required: true,
  },
});

const route = useRoute();
const searchQuery = ref("");
const selectedCategory = ref("");
const searchTimeout = ref<ReturnType<typeof setTimeout> | null>(null);
const searchTimeoutDelay =
  +import.meta.env.VITE_PRODUCT_FILTER_SEARCH_TIMEOUT_DELAY || 800;
const initialMinPrice = +import.meta.env.VITE_PRODUCT_FILTER_MIN_PRICE || 0;
const initialMaxPrice = +import.meta.env.VITE_PRODUCT_FILTER_MAX_PRICE || 5000;
const priceRange = ref([initialMinPrice, initialMaxPrice]);
const minPrice = computed(() => priceRange.value[0]);
const maxPrice = computed(() => priceRange.value[1]);
const startDate = ref<DateRange["start"] | null>(null);
const endDate = ref<DateRange["end"] | null>(null);

const emit = defineEmits(["on-set-filter-params", "on-do-filter"]);

const handleCategoryChange = () => {
  onFilter();
};

const handleSearch = () => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
  searchTimeout.value = setTimeout(() => {
    onFilter();
  }, searchTimeoutDelay);
};

const handlePriceChange = () => {
  onFilter();
};

watch([startDate, endDate], async () => {
  onFilter();
});

const onFilter = () => {
  setFilterParams();
  emit("on-do-filter");
};

const setFilterParams = () => {
  const filterParams = new URLSearchParams();
  if (searchQuery.value) {
    filterParams.append("title_like", searchQuery.value);
  }

  if (selectedCategory.value) {
    filterParams.append("category", selectedCategory.value);
  }
  if (minPrice && minPrice.value > initialMinPrice)
    filterParams.append("price_gte", minPrice.value.toString());

  if (maxPrice && maxPrice.value < initialMaxPrice)
    filterParams.append("price_lte", maxPrice.value.toString());

  if (startDate.value) {
    const startDateStr = new Date(startDate.value.toString())
      .toISOString()
      .split("T")[0];
    filterParams.append("date_gte", startDateStr);
  }

  if (endDate.value) {
    const endDateStr = new Date(endDate.value.toString())
      .toISOString()
      .split("T")[0];
    filterParams.append("date_lte", endDateStr);
  }
  emit("on-set-filter-params", filterParams);
};

const reloadFiltersBasedOnQueryParams = (query: Record<string, string>) => {
  if (query.title_like) {
    searchQuery.value = query.title_like as string;
  }
  if (query.category) {
    selectedCategory.value = query.category as string;
  }
  if (query.price_gte) {
    priceRange.value[0] = parseInt(query.price_gte as string);
  }
  if (query.price_lte) {
    priceRange.value[1] = parseInt(query.price_lte as string);
  }
  if (query.date_gte) {
    const [year, month, day] = (query.date_gte as string)
      .split("-")
      .map(Number);
    startDate.value = new CalendarDate(year, month, day);
  }
  if (query.date_lte) {
    const [year, month, day] = (query.date_lte as string)
      .split("-")
      .map(Number);
    endDate.value = new CalendarDate(year, month, day);
  }
  setFilterParams();
};

onMounted(() => {
  const query = route.query as Record<string, string>;
  if (Object.keys(query).length > 0) {
    reloadFiltersBasedOnQueryParams(query);
  }
});
</script>
