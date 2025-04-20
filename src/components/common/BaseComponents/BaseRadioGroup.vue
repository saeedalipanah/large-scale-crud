<template>
  <RadioGroup v-model="localValue" class="text-md">
    <div v-for="(item, i) in items" :key="item.value + i" class="flex items-center space-x-2">
      <RadioGroupItem :id="item.value + i" :value="item.value" class="me-2" />
      <label :for="item.value + i">{{ item.label }}</label>
      <slot name="actions" :item-info="{ item, i }"></slot>
    </div>
  </RadioGroup>
</template>
<script setup lang="ts">
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { computed, type PropType } from 'vue';
const props = defineProps({
  modelValue: { type: String, required: true },
  items: {
    type: Array as PropType<{ label: string; value: string }[]>,
    required: true,
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
