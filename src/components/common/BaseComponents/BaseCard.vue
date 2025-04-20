<template>
  <Card class="p-2 relative">
    <slot>
      <CardHeader class="mb-1">
        <slot name="card-header">
          <CardTitle class="mb-2">{{ title }}</CardTitle>
          <CardDescription>{{ description }}</CardDescription>
        </slot>
      </CardHeader>
      <CardContent>
        <slot name="card-content"></slot>
      </CardContent>
      <CardFooter v-if="$slots['card-footer']">
        <slot name="card-footer"></slot>
      </CardFooter>
    </slot>
  </Card>
</template>
<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
defineProps({
  title: { type: String, default: 'Create project' },
  description: {
    type: String,
    default: 'The card description',
  },
});
</script>
