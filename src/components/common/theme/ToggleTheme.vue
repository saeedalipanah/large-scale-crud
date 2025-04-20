<template>
  <BaseButton
    v-if="currentTheme === themeE.Light"
    @click="setCurrentTheme(themeE.Dark)"
    variant="ghost"
    class="rounded-xl"
    size="lg"
  >
    <MoonStar class="min-w-5 min-h-5"  />
  </BaseButton>
  <BaseButton
    v-else
    @click="setCurrentTheme(themeE.Light)"
    variant="ghost"
    class="rounded-xl"
    size="lg"
  >
    <Sun class="min-w-5 min-h-5"  />
  </BaseButton>
</template>
<script setup lang="ts">
import { MoonStar, Sun } from "lucide-vue-next";
import { onMounted, computed } from "vue";
import { ThemesStore } from "@/stores/themes";
import { themeE } from "@/types/themes";
const store = ThemesStore();
const currentTheme = computed(() => store.currentTheme);
const setCurrentTheme = (theme: themeE) => {
  store.setTheme(theme);
};
onMounted(() => {});
</script>
<style scoped lang="scss">
.toggle-btn {
  position: fixed;
  left: 1rem;
  top: 1rem;
}
</style>
