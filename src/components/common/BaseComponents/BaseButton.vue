<template>
  <Button @click="emit('click')" :type="type" :disabled="loading">
    <template v-if="loading">
      <Loader2 class="w-4 h-4 animate-spin" />
    </template>
    <template v-else>
      <slot>{{ content }}</slot>
    </template>
  </Button>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-vue-next';
defineProps({
  content: { type: String, default: 'button-name' },
  type: { type: String, default: 'button' },
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(['click']);
</script>
