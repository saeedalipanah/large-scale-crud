<template>
  <div class="navbar w-full h-16 flex flex-col justify-center">
    <div class="flex justify-between">
      <h1 class="text-4xl font-bold text-green-400">
        IRAN<span class="text-foreground">SERVER</span>
      </h1>
      <ToggleTheme />
    </div>
  </div>
</template>

<script setup lang="ts">
import ToggleTheme from "@/components/common/theme/ToggleTheme.vue";
</script>
