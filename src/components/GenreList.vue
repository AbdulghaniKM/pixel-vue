<template>
  <div class="relative mb-8">
    <div class="flex items-center gap-4">
      <motion.button
        v-show="canScrollLeft"
        :whileHover="{ scale: 1.05 }"
        :whileTap="{ scale: 0.95 }"
        @click="scroll('left')"
        class="hidden md:flex shrink-0 bg-secondary-300 text-primary-700 rounded-2xl w-12 h-12 items-center justify-center transition-all duration-300"
      >
        <Icon icon="mdi:chevron-left" class="text-2xl" />
      </motion.button>
      <div
        ref="scrollContainer"
        class="flex gap-2 overflow-x-auto py-2 scrollbar-hide scroll-smooth"
        @wheel.prevent="handleWheel"
      >
        <button
          v-for="(genre, index) in genres"
          :key="genre.id"
          v-motion
          :initial="{ x: -50, opacity: 0 }"
          :enter="{
            x: 0,
            opacity: 1,
            transition: {
              delay: index * 0.1,
              duration: 0.4,
            },
          }"
          :hovered="hoverBounce"
          :class="[
            'px-4 py-2 rounded-2xl text-secondary-300 transition-all duration-300 whitespace-nowrap text-sm font-medium shadow-sm hover:shadow-lg',
            selectedGenre === genre.id
              ? 'bg-secondary-400 hover:bg-secondary-500 !text-primary-700 hover:shadow-secondary-400/25'
              : 'bg-primary-800/50 hover:bg-primary-700/80 hover:shadow-primary-900/25',
          ]"
          @click="$emit('select', genre.id)"
        >
          {{ genre.name }}
        </button>
      </div>
      <motion.button
        v-show="canScrollRight"
        :whileHover="{ scale: 1.05 }"
        :whileTap="{ scale: 0.95 }"
        @click="scroll('right')"
        class="hidden md:flex shrink-0 bg-secondary-300 text-primary-700 rounded-2xl w-12 h-12 items-center justify-center transition-all duration-300"
      >
        <Icon icon="mdi:chevron-right" class="text-2xl" />
      </motion.button>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { MovieGenre } from "../../types/movie";
import { slideFromLeft, hoverBounce } from "../constants/motion";
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { Icon } from "@iconify/vue";
import { motion } from "motion-v";
defineProps<{
  genres: MovieGenre[];
  selectedGenre?: number;
}>();
defineEmits<{
  (e: "select", genreId: number): void;
}>();
const scrollContainer = ref<HTMLElement | null>(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);
const scroll = (direction: "left" | "right") => {
  if (!scrollContainer.value) return;
  const scrollAmount = scrollContainer.value.clientWidth * 0.5;
  scrollContainer.value.scrollBy({
    left: direction === "left" ? -scrollAmount : scrollAmount,
    behavior: "smooth",
  });
};
const handleWheel = (e: WheelEvent) => {
  if (!scrollContainer.value) return;
  e.preventDefault();

  const scrollMultiplier = e.deltaMode === 1 ? 20 : 1.5;
  const scrollAmount = e.deltaY * scrollMultiplier;

  scrollContainer.value.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
};
const updateScrollButtons = () => {
  if (!scrollContainer.value) return;

  const container = scrollContainer.value;
  const scrollLeft = Math.round(container.scrollLeft);
  const maxScroll = container.scrollWidth - container.clientWidth;

  // Show left button only if we're not at the start (with small threshold)
  canScrollLeft.value = scrollLeft >= 2;

  // Show right button if we haven't reached the end (with small threshold)
  canScrollRight.value = scrollLeft < maxScroll - 10;
};
const throttle = (fn: Function, wait: number) => {
  let time = Date.now();
  return () => {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
};
const throttledUpdate = throttle(updateScrollButtons, 100);
onMounted(async () => {
  // Wait for the next tick to ensure initial render
  await nextTick();
  updateScrollButtons();

  // Additional check after a short delay
  setTimeout(() => {
    updateScrollButtons();
  }, 100);

  if (scrollContainer.value) {
    scrollContainer.value.addEventListener("scroll", throttledUpdate);
    window.addEventListener("resize", throttledUpdate);
    const observer = new MutationObserver(throttledUpdate);
    observer.observe(scrollContainer.value, {
      childList: true,
      subtree: true,
    });
  }
});
onUnmounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener("scroll", throttledUpdate);
    window.removeEventListener("resize", throttledUpdate);
  }
});
</script>
<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
::selection {
  background-color: var(--color-secondary-400);
  color: var(--color-primary-900);
}
::-moz-selection {
  background-color: var(--color-secondary-400);
  color: var(--color-primary-900);
}
</style>
