<template>
  <BaseDialog v-model="localValue" :title :description>
    <template #footer>
      <BaseButton
        :disabled="cancelDisabled"
        variant="outline"
        class="me-2"
        @click="emits('on-cancel')"
        >Cancel</BaseButton
      >
      <BaseButton
        class="w-20 bg-destructive text-white"
        :loading="acceptLoading"
        :disabled="acceptDisabled"
        @click="emits('on-accept')"
      >
        Accept
      </BaseButton>
    </template>
  </BaseDialog>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: { type: String, required: false },
  description: { type: String, required: false },
  cancelDisabled: { type: Boolean, default: false },
  acceptLoading: { type: Boolean, default: false },
  acceptDisabled: { type: Boolean, default: false },
});
const emits = defineEmits(['update:model-value', 'on-cancel', 'on-accept']);
const localValue = computed<boolean>({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emits('update:model-value', newValue);
  },
});
</script>
