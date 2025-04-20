<template>
  <div class="flex justify-between items-center mb-4">
    <div class="sm:flex sm:items-end gap-2">
      <h1 class="text-3xl font-bold">{{ title }}</h1>
      <span class="hidden sm:block mb-[4px]">|</span>
      <div class="flex items-center gap-2 mb-[2px]">
        <span class="text-muted-foreground">
          Showing {{ (page - 1) * perPage + 1 }} - {{ page * perPage }} of
          {{ totalItems }} Items
        </span>
        <Loader
          v-if="isLoading"
          class="w-5 h-5 text-muted-foreground animate-spin"
        />
      </div>
    </div>
    <BaseButton variant="outline" @click="$emit('on-add-new-click')">{{
      addNewButtonText
    }}</BaseButton>
  </div>
</template>

<script setup lang="ts">
import { Loader } from 'lucide-vue-next';

defineProps({
  title: {
    type: String,
    default: "Products",
  },
  page: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    default: 0,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  addNewButtonText: {
    type: String,
    default: "Add New Item",
  },
});
</script>