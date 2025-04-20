<template>
  <div class="flex items-center space-x-2">
    <Switch
      v-bind="props"
      :checked="modelValue"
      style="direction: ltr"
      class="ms-2"
      @update:checked="emit('update:model-value', $event)"
    />
    <label v-if="label" :for="id" class="text-xs">{{ label }}</label>
  </div>
</template>
<script setup lang="ts">
import { Switch } from '@/components/ui/switch';
const props = defineProps({
  modelValue: { type: Boolean, required: true },
  label: { type: String, required: false },
  id: {
    type: String,
    default: 'input',
  },
});
const emit = defineEmits(['update:model-value']);
</script>
