<template>
  <div class="base-input-container">
    <div class="relative w-full items-center">
      <label v-if="label" :for="id" class="text-xs">{{ label }}</label>
      <Textarea
        v-bind="props"
        v-model="localValue"
        :class="`${exactTextareaClass} ${$slots['prepend-icon'] && 'ps-10'} resize-none`"
      />
      <span
        v-if="$slots['prepend-icon']"
        class="absolute start-0 top-7 inset-y-1 flex items-center justify-center px-2"
      >
        <slot name="prepend-icon"> </slot>
      </span>
      <span
        v-if="$slots['append-icon']"
        class="absolute end-0 inset-y-0 flex items-center justify-center px-2"
      >
        <slot name="append-icon"> </slot>
      </span>
    </div>
    <p class="text-xs text-destructive mt-0.5 min-h-4">{{ error || ' ' }}</p>
  </div>
</template>
<script setup lang="ts">
import { Textarea } from '@/components/ui/textarea';
import { computed } from 'vue';
const props = defineProps({
  modelValue: { type: String, required: true },
  label: { type: String, required: false },
  placeholder: { type: String, required: false },
  type: {
    type: String,
    default: 'text',
  },
  id: {
    type: String,
    default: 'input',
  },
  exactTextareaClass: {
    type: String,
    required: false,
  },
  error: {
    type: String,
    required: false,
  },
  rows: {
    type: Number,
    required: false,
  },
});

const emit = defineEmits(['update:model-value']);

const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:model-value', newValue);
  },
});
</script>
