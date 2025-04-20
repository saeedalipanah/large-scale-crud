<template>
  <div class="flex justify-between w-full">
    <BaseButton
      :disabled="prevIsDisabled"
      variant="outline"
      size="icon"
      @click="prev"
    >
      <ChevronLeft class="w-4 h-4" />
    </BaseButton>
    <div class="flex items-center mx-2 gap-x-2">
      <BaseInput
        v-model="currentPage"
        :min="1"
        :max="lastPage"
        type="number"
        class="w-28"
        exact-input-class="text-md"
        @keydown.enter="updatePage"
        @blur="onBlur"
      >
        <template #append-icon>
          <Search
            class="size-5 mb-6 cursor-pointer text-muted-foreground"
            @click="updatePage"
          />
        </template>
      </BaseInput>
      <span class="mb-4 text-muted-foreground">of</span>
      <span class="mb-4 text-muted-foreground">{{ lastPage }}</span>
    </div>

    <BaseButton
      :disabled="nextIsDisabled"
      variant="outline"
      size="icon"
      @click="next"
    >
      <ChevronRight class="w-4 h-4" />
    </BaseButton>
  </div>
</template>
<script setup lang="ts">
import { ChevronRight, ChevronLeft, Search } from "lucide-vue-next";
import { computed, ref, watch } from "vue";

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
  perPage: {
    type: [String, Number],
    default: 6,
  },
});
const emits = defineEmits(["on-page-change"]);
const currentPage = ref(+props.page);

watch(
  () => props.page,
  (newVal) => {
    currentPage.value = newVal;
  }
);

const lastPage = computed<number>(() =>
  Math.ceil(+props.total / +props.perPage)
);

const prevIsDisabled = computed<boolean>(() => currentPage.value <= 1);
const nextIsDisabled = computed<boolean>(
  () => currentPage.value >= lastPage.value
);

const next = () => {
  currentPage.value < 1 || nextIsDisabled.value
    ? (currentPage.value = props.page + 1)
    : currentPage.value++;

  if (currentPage.value > lastPage.value) currentPage.value = lastPage.value;

  updatePage();
};
const prev = () => {
  prevIsDisabled.value || currentPage.value > lastPage.value
    ? (currentPage.value = props.page - 1)
    : currentPage.value--;

  if (currentPage.value < 1) currentPage.value = 1;

  updatePage();
};
const updatePage = () => {
  if (currentPage.value <= 1) currentPage.value = 1;
  if (currentPage.value > lastPage.value) currentPage.value = lastPage.value;
  emits("on-page-change", currentPage.value);
};

const onBlur = () => {
  setTimeout(() => {
    if (currentPage.value !== props.page) {
      currentPage.value = props.page;
    }
  }, 100);
};
</script>
<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
