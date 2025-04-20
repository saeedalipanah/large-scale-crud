<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="text-xs">{{ label }}</label>
    <div class="relative">
      <Select v-model="localValue" :disabled>
        <SelectTrigger>
          <SelectValue :placeholder="placeholder" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="(item, i) in items"
              :key="item.value + i"
              :value="item.value"
            >
              {{ item.label }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <BaseButton
        v-if="localValue"
        @click="clearSelection"
        class="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
        variant="text"
      >
        <X class="h-4 w-4" />
      </BaseButton>
    </div>
    <p class="text-xs text-destructive mt-0.5 min-h-4">{{ error || ' ' }}</p>
  </div>
</template>
<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-vue-next";
import { computed, type PropType } from "vue";
// import BaseButton from "./BaseButton.vue";
const props = defineProps({
  modelValue: { type: String, required: true },
  items: {
    type: Array as PropType<{ label: string; value: string }[]>,
    required: true,
  },
  label: { type: String, required: false },
  placeholder: { type: String, required: false },
  id: {
    type: String,
    default: "input",
  },
  error: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:model-value"]);

const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:model-value", newValue);
  },
});

const clearSelection = () => {
  emit("update:model-value", "");
};
</script>
