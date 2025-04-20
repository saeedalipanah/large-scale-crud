<template>
  <div class="grid grid-cols-2 gap-x-4 gap-y-2">
    <BaseInput
      v-model="formData.title"
      :error="errors.title"
      label="Title"
      placeholder="Enter product title"
      class="col-span-2 md:col-span-1"
      id="product-form-title"
      @update:modelValue="errors.title = fieldsValidation(formData.title)"
    />
    <BaseSelect
      v-model="formData.category"
      :items="categoryOptions"
      :error="errors.category"
      placeholder="Select category"
      label="Category"
      class="col-span-2 md:col-span-1"
      id="product-form-category"
      @update:modelValue="errors.category = fieldsValidation(formData.category)"
    />
    <BaseInput
      v-model.number="formData.price"
      :error="errors.price"
      placeholder="Enter price"
      type="number"
      label="Price"
      class="col-span-2 md:col-span-1"
      id="product-form-price"
      @update:modelValue="errors.price = fieldsValidation(formData.price, { min: 0 })"
    >
      <template #append-icon>
        <DollarSign class="size-4  text-muted-foreground" />
      </template>
    </BaseInput>
    <BaseInput
      v-model.number="formData.stock"
      :error="errors.stock"
      type="number"
      label="Stock"
      placeholder="Enter stock quantity"
      class="col-span-2 md:col-span-1"
      id="product-form-stock"
      @update:modelValue="errors.stock = fieldsValidation(formData.stock, { min: 0 })"
    />
    <BaseInput
      v-model.number="formData.rating"
      :error="errors.rating"
      :min="0"
      :max="5"
      type="number"
      label="Rating"
      placeholder="Enter rating (1-5)"
      class="col-span-2 md:col-span-1"
      id="product-form-rating"
      @update:modelValue="errors.rating = fieldsValidation(formData.rating, { min: 0, max: 5 })"
    >
      <template #append-icon>
        <Star class="size-4  text-muted-foreground" />
      </template>
    </BaseInput>

    <div class="col-span-2 md:col-span-1">
      <BaseButton class="w-full mt-6 shadow-none" variant="outline" disabled>
        <span>{{
          formData.date
            ? new Date(formData.date).toLocaleString()
            : "Pick a date"
        }}</span>
        <CalendarIcon class="h-4 w-4 opacity-50" />
      </BaseButton>
    </div>

    <BaseTextarea
      v-model="formData.description"
      :error="errors.description"
      label="Description"
      placeholder="Enter product description"
      rows="6"
      class="col-span-2"
      id="product-form-description"
      @update:modelValue="errors.description = fieldsValidation(formData.description)"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { ProductInterface } from "@/types/products";
import { CalendarIcon, DollarSign, Star } from "lucide-vue-next";


const props = defineProps<{
  product?: ProductInterface;
  categoryOptions: { label: string; value: string }[];
}>();

const emit = defineEmits<{
  (e: "update:product", value: ProductInterface): void;
  (e: "submit", value: ProductInterface): void;
}>();

const formData = reactive<ProductInterface>({
  id: props.product?.id || Date.now(),
  title: props.product?.title,
  category: props.product?.category,
  price: props.product?.price,
  stock: props.product?.stock,
  rating: props.product?.rating,
  date: props.product?.date ? props.product?.date : new Date().toISOString(),
  description: props.product?.description || "",
});

const errors = reactive({
  title: "",
  category: "",
  price: "",
  stock: "",
  rating: "",
  date: "",
  description: "",
});



const validateForm = () => {
  let isValid = true;
  errors.title = fieldsValidation(formData.title);
  errors.category = fieldsValidation(formData.category);
  errors.price = fieldsValidation(formData.price, { min: 0 });
  errors.stock = fieldsValidation(formData.stock, { min: 0 });
  errors.rating = fieldsValidation(formData.rating, { min: 0, max: 5 });
  errors.date = fieldsValidation(formData.date);
  errors.description = fieldsValidation(formData.description);

  Object.values(errors).forEach((error) => {
    if (error) isValid = false;
  });

  return isValid;
};
const fieldsValidation = (
  value: any,
  options?: {
    min: number;
    max?: number;
  }
) => {
  console.log(value, options);
  if (value === undefined || value === null || value === "")
    return "Field is required";
  if (options?.min !== undefined && value <= options.min)
    return `Field must be greater than ${options.min}`;
  if (options?.max !== undefined && value > options.max)
    return `Field must be less than ${options.max}`;
  return "";
};

const getFormData = () => {
  if (validateForm()) {
    return { ...formData };
  }
  return null;
};

const handleSubmit = async () => {
  const formData = getFormData();
  if (formData) {
    emit("submit", formData);
  }
};

defineExpose({
  getFormData,
  handleSubmit,
});
</script>
