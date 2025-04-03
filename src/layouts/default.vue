<template>
  <Header />
  <main class="min-h-screen bg-primary-700 py-4">
    <slot />
  </main>
  <Footer />
</template>
<script setup lang="ts">
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>
