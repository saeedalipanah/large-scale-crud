<template>
  <div class="base-input-container">
    <div class="relative w-full items-center">
      <label v-if="label" :for="id" class="text-xs">{{ label }}</label>
      <Input
        v-bind="props"
        v-model.trim="localValue"
        :class="`base-input ${exactInputClass} ${$slots['prepend-icon'] && 'ps-10'}`"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @keydown="onKeyDown"
      />
      <span
        v-if="$slots['prepend-icon']"
        class="absolute start-0 top-7 inset-y-1 flex items-center justify-center px-2"
      >
        <slot name="prepend-icon"> </slot>
      </span>
      <span
        v-if="$slots['append-icon']"
        class="absolute end-0 top-6 inset-y-0 flex items-center justify-center px-2"
      >
        <slot name="append-icon"> </slot>
      </span>
    </div>
    <p class="text-xs text-destructive mt-0.5 min-h-4">{{ error || " " }}</p>
  </div>
</template>
<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { computed } from "vue";
const props = defineProps({
  modelValue: { type: [String, Number], required: true },
  label: { type: String, required: false },
  placeholder: { type: String, required: false },
  type: {
    type: String,
    default: "text",
  },
  id: {
    type: String,
    default: "input",
  },
  exactInputClass: { type: String, required: false },
  error: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["update:model-value", "focus", "blur", "keydown"]);

const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:model-value", newValue);
  },
});

const onKeyDown = (e: KeyboardEvent) => {
  emit("keydown", e);
};
</script>
