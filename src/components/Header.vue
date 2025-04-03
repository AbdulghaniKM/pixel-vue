<template>
  <header class="bg-primary-700 py-4">
    <div class="container">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <router-link to="/">
            <img src="/img/logo.png" alt="logo" class="w-64" />
          </router-link>
        </div>
        <div class="flex items-center">
          <div class="relative">
            <input
              type="text"
              placeholder="Search"
              class="w-full rounded-2xl border-2 border-primary-300 focus:border-primary-500 focus:outline-none bg-primary-400 p-3 pl-12"
            />
            <Icon
              icon="mdi:search"
              class="text-primary-700 text-3xl absolute left-2 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>
