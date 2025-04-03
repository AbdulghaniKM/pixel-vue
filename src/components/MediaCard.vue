<template>
  <div
    v-motion
    :initial="{ scale: 0.8, opacity: 0 }"
    :enter="{ scale: 1, opacity: 1 }"
    :hovered="hoverBounce"
    class="group relative bg-primary-900/40 rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:shadow-xl hover:shadow-secondary-500/10 backdrop-blur-sm cursor-pointer border border-secondary-800/50"
    @click="$emit('click', media)"
  >
    <div class="relative aspect-[2/3] overflow-hidden rounded-xl">
      <img
        :src="`https://image.tmdb.org/t/p/w500${media.poster_path}`"
        :alt="isMovie ? media.title : media.name"
        class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"
      ></div>
    </div>
    <div class="absolute inset-0 flex flex-col justify-end p-4">
      <div
        v-motion
        :initial="{ y: -20, opacity: 0 }"
        :enter="{ y: 0, opacity: 1, transition: { delay: 0.2 } }"
        class="absolute top-3 right-3 bg-primary-900/95 px-3 py-1.5 rounded-xl backdrop-blur-md shadow-lg transform group-hover:translate-y-0 transition-all duration-300 border border-secondary-500/20"
      >
        <div class="flex items-center gap-1.5">
          <Icon icon="mdi:star" class="text-secondary-500" />
          <span class="text-secondary-100 font-bold text-sm">
            {{ media.vote_average.toFixed(1) }}
          </span>
        </div>
      </div>
      <div
        v-motion
        :initial="{ y: 20, opacity: 0 }"
        :enter="{ y: 0, opacity: 1, transition: { delay: 0.3 } }"
        class="transform group-hover:translate-y-0 transition-transform duration-300 bg-primary-900/80 backdrop-blur-md p-4 -mx-4 -mb-4 border-t border-secondary-500/10"
      >
        <h3 class="text-secondary-100 font-bold text-xl mb-3 line-clamp-1">
          {{ isMovie ? media.title : media.name }}
        </h3>
        <div class="flex flex-wrap gap-2 mb-3">
          <span
            v-for="(genreName, index) in getGenreNames(media.genre_ids)"
            :key="genreName"
            v-motion
            :initial="{ scale: 0, opacity: 0 }"
            :enter="{
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.4 + index * 0.1,
                type: 'spring',
                stiffness: 300,
                damping: 20,
              },
            }"
            class="text-xs px-2.5 py-1 rounded-lg bg-secondary-500/10 text-secondary-300 backdrop-blur-sm border border-secondary-500/20"
          >
            {{ genreName }}
          </span>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span
            v-motion
            :initial="{ x: -20, opacity: 0 }"
            :enter="{ x: 0, opacity: 1, transition: { delay: 0.5 } }"
            class="text-secondary-300/90 bg-primary-800/50 px-2.5 py-1 rounded-lg"
          >
            {{
              new Date(
                isMovie ? media.release_date : media.first_air_date
              ).getFullYear()
            }}
          </span>
          <span
            class="flex items-center gap-2 text-secondary-300/80 bg-primary-800/50 px-2.5 py-1 rounded-lg"
          >
            <Icon icon="mdi:eye" class="text-secondary-500" />
            <span
              v-motion
              :initial="{ x: 20, opacity: 0 }"
              :enter="{ x: 0, opacity: 1, transition: { delay: 0.5 } }"
              class=""
            >
              {{ media.vote_count }}
            </span>
          </span>
        </div>
        <div
          class="h-0 group-hover:h-20 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden mt-3"
        >
          <p class="text-secondary-300/80 text-sm line-clamp-3">
            {{ media.overview }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie, MovieGenre } from "../../types/movie";
import type { Show } from "../../types/shows";
import { Icon } from "@iconify/vue";
import { popUp, hoverBounce } from "../constants/motion";
import { computed } from "vue";

const props = defineProps<{
  media: Movie | Show;
  genres: MovieGenre[];
  type: "movie" | "show";
}>();

const isMovie = computed(() => props.type === "movie");

const getGenreNames = (genreIds: number[]) => {
  return genreIds
    .map((id) => props.genres.find((g) => g.id === id)?.name)
    .filter((name) => name !== undefined)
    .slice(0, 3);
};

defineEmits<{
  (e: "click", media: Movie | Show): void;
}>();
</script>

<style scoped>
::selection {
  background-color: var(--color-secondary-500);
  color: var(--color-primary-900);
}
::-moz-selection {
  background-color: var(--color-secondary-500);
  color: var(--color-primary-900);
}
</style>
