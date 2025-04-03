<template>
  <footer class="bg-secondary-400 py-4 footer-selection">
    <div class="container mt-4">
      <div class="flex justify-between items-center">
        <motion.div v-bind="slideFromLeft">
          <div class="flex items-center gap-2">
            <Icon icon="mdi:movie-star" class="text-primary-700 text-2xl" />
            <h1 class="text-primary-700 text-2xl font-bold">Pixel-Vue</h1>
          </div>
          <motion.p
            v-bind="fadeIn"
            :transition="{ ...fadeIn.transition, delay: 0.2 }"
            class="text-primary-700 text-sm"
          >
            Pixel-Vue, a "view" of Movies.
          </motion.p>
        </motion.div>
        <motion.div v-bind="slideFromRight" class="flex items-center gap-4">
          <motion.a
            :whileHover="hoverBounce"
            :whilePress="{ scale: PressScale }"
            href="https://github.com/AbdulghaniKM"
            target="_blank"
            class="bg-secondary-300 shadow-xs shadow-primary-700/50 rounded-2xl p-2"
          >
            <Icon icon="mdi:github" class="text-primary-700 text-2xl" />
          </motion.a>
          <motion.a
            :whileHover="hoverBounce"
            :whilePress="{ scale: PressScale }"
            class="bg-secondary-300 shadow-xs shadow-primary-700/50 rounded-2xl p-2"
            href="https://www.linkedin.com/in/abdulghani-khalid-mohsin-647278243/"
            target="_blank"
          >
            <Icon icon="mdi:linkedin" class="text-primary-700 text-2xl" />
          </motion.a>
        </motion.div>
      </div>
      <motion.div
        v-bind="popUp"
        :transition="{ ...popUp.transition, delay: 0.4 }"
        class="flex justify-center flex-col gap-4 items-center"
      >
        <div class="flex items-center gap-2">
          <span class="text-primary-700 text-sm"> Made with </span>
          <motion.div
            :animate="{ scale: [1, 1.2, 1] }"
            :transition="{
              repeat: Infinity,
              duration: 1.5,
              ease: 'easeInOut',
            }"
          >
            <Icon icon="mdi:heart" class="text-primary-700 text-2xl" />
          </motion.div>
          <span class="text-primary-700 text-sm">by AbdulghaniKM</span>
        </div>
        <p class="text-primary-700 text-sm">
          &copy; 2025 Pixel-Vue. All rights reserved.
        </p>
      </motion.div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { motion } from "motion-v";
import {
  PressScale,
  slideFromLeft,
  slideFromRight,
  fadeIn,
  popUp,
  hoverBounce,
} from "../constants/motion";
</script>

<style scoped>
.footer-selection {
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
