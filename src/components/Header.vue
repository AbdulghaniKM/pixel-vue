<template>
  <header
    class="bg-secondary-400 header-selection shadow shadow-secondary-300 py-4"
  >
    <div class="container">
      <div class="flex justify-between items-center">
        <motion.div
          v-bind="slideFromLeft"
          :whileHover="hoverBounce"
          :whilePress="{ scale: PressScale }"
          class="flex items-center bg-secondary-300 shadow-xs shadow-primary-700/50 rounded-2xl p-2"
        >
          <router-link to="/">
            <div class="flex items-center gap-2 text-3xl">
              <Icon icon="mdi:movie-star" class="text-primary-700" />
              <h1 class="text-primary-700 font-bold">Pixel-Vue</h1>
            </div>
          </router-link>
        </motion.div>
        <motion.div
          v-bind="slideFromRight"
          :transition="{ ...slideFromRight.transition, delay: 0.2 }"
          class="flex items-center"
        >
          <div class="relative">
            <motion.input
              type="text"
              placeholder="Search"
              :whileFocus="{ scale: 1.02 }"
              class="w-full rounded-2xl border-2 border-primary-400/50 focus:border-primary-500 focus:outline-none bg-primary-700 text-secondary-300 p-3 pl-12 placeholder:text-secondary-300"
            />
            <Icon
              icon="mdi:search"
              class="text-secondary-300 text-3xl absolute left-2 top-1/2 -translate-y-1/2"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { motion } from "motion-v";
import {
  PressScale,
  slideFromLeft,
  slideFromRight,
  hoverBounce,
} from "../constants/motion";
</script>
<style scoped>
.header-selection {
  ::selection {
    background-color: var(--color-primary-700);
    color: var(--color-secondary-300);
  }
  ::-moz-selection {
    background-color: var(--color-primary-700);
    color: var(--color-secondary-300);
  }
}
</style>
