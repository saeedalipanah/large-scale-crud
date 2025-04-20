<template>
  <main class="pb-5">
    <Toaster />
    <main class="w-[95%] max-w-[1400px] mx-auto ">
      <Navbar class="mb-6" />
      <RouterView />
    </main>
  </main>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
import Toaster from '@/components/ui/toast/Toaster.vue';
import Navbar from '@/components/containers/Navbar.vue';
import { ThemesStore } from '@/stores/themes';
import { themeE } from '@/types/themes';
import { onBeforeMount } from 'vue';
const themeStore = ThemesStore();
onBeforeMount(() => {
  const savedTheme = localStorage.getItem("theme");
  themeStore.setTheme((savedTheme as themeE) ?? themeE.Light);
});
</script>
