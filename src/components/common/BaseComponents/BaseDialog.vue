<template>
  <Dialog :open="modelValue" @open-change="emit('update:model-value', $event)">
    <DialogContent class="sm:rounded-lgh">
      <DialogHeader>
        <DialogTitle class="mb-1">{{ title }}</DialogTitle>
        <DialogDescription>{{ description }}</DialogDescription>
      </DialogHeader>
      <slot v-if="$slots['content']" name="content"> </slot>
      <DialogFooter>
        <slot name="footer">
          <BaseButton @click="closeDialog">Close</BaseButton>
        </slot>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, default: 'Dialog Title' },
  description: { type: String, default: 'Dialog description goes here.' },
});

const emit = defineEmits(['update:model-value']);

const closeDialog = () => {
  emit('update:model-value', false);
};
</script>
