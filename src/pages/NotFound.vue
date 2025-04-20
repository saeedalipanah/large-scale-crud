<template>
  <div class="h-[95vh] flex flex-col justify-center items-center">
    <h1 class="font-bold text-2xl">404 - Page Not Found</h1>
    <p class="mt-3 text-muted-foreground">The page you are looking for does not exist.</p>

    <Router-link :to="{ name: 'home' }" class="mt-8 text-blue-500 underline"
      >Return to Home</Router-link
    >
  </div>
</template>
<script setup lang="ts"></script>
