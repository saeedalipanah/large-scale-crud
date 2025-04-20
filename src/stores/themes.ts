import { ref } from "vue";
import { defineStore } from "pinia";

import { themeE } from "../types/themes";
export const ThemesStore = defineStore("themes", () => {
  const currentTheme = ref<themeE>(themeE.Light);
  const setTheme = (theme: themeE) => {
    currentTheme.value = theme;
    localStorage.setItem("theme", currentTheme.value);
    const htmlElement = document.documentElement;
    theme === themeE.Dark
      ? htmlElement.classList.add("dark")
      : htmlElement.classList.remove("dark");
  };

  return {  currentTheme, setTheme };
});
