<template>
  <div class="flex items-center space-x-8">
    <Checkbox
      v-bind="props"
      :checked="modelValue"
      :class="`${exactCheckboxClass} me-2`"
      @update:checked="emit('update:model-value', $event)"
    />
    <label v-if="label" :for="id" class="!me-2">
      {{ label }}
    </label>
  </div>
</template>
<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox';
const props = defineProps({
  modelValue: { type: Boolean, required: true },
  label: { type: String, required: false },
  id: {
    type: String,
    default: 'checkbox',
  },
  exactCheckboxClass: { type: String, required: false },
});
const emit = defineEmits(['update:model-value']);
</script>
