<template>
  <footer class="bg-primary-700 py-4">
    <div class="container mt-4">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-primary-200 text-2xl font-bold">Pixel-Vue</h1>
          <p class="text-primary-200 text-sm">Pixel-Vue, a "view" of Movies.</p>
        </div>
        <div class="flex items-center gap-4">
          <a href="https://github.com/AbdulghaniKM" target="_blank">
            <Icon icon="mdi:github" class="text-primary-200 text-2xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/abdulghani-khalid-mohsin-647278243/"
            target="_blank"
          >
            <Icon icon="mdi:linkedin" class="text-primary-200 text-2xl" />
          </a>
        </div>
      </div>
      <div class="flex justify-center flex-col gap-4 items-center">
        <div class="flex items-center gap-2">
          <span class="text-primary-200 text-sm"> Made with </span>
          <Icon icon="mdi:heart" class="text-primary-200 text-2xl" />
          <span class="text-primary-200 text-sm">by AbdulghaniKM</span>
        </div>
        <p class="text-primary-200 text-sm">
          &copy; 2025 Pixel-Vue. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>
