<template>
  <div class="flex gap-2 mb-8 overflow-x-auto py-2 scrollbar-hide">
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
        'px-4 py-2 rounded-2xl text-secondary-300 transition-all duration-300 whitespace-nowrap text-sm font-medium',
        selectedGenre === genre.id
          ? 'bg-secondary-400 hover:bg-secondary-600 !text-primary-700'
          : 'bg-primary-800/50 hover:bg-primary-600',
      ]"
      @click="$emit('select', genre.id)"
    >
      {{ genre.name }}
    </button>
  </div>
</template>
<script setup lang="ts">
import type { MovieGenre } from "../../types/movie";
import { slideFromLeft, hoverBounce } from "../constants/motion";

defineProps<{
  genres: MovieGenre[];
  selectedGenre?: number;
}>();

defineEmits<{
  (e: "select", genreId: number): void;
}>();
</script>
<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
