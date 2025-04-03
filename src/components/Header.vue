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
        <!-- <motion.div
          v-bind="slideFromRight"
          :transition="{ ...slideFromRight.transition, delay: 0.2 }"
          class="flex items-center"
        >
          <form @submit.prevent="handleSearch" class="relative">
            <motion.input
              type="text"
              placeholder="Search movies..."
              v-model="searchQuery"
              :whileFocus="{ scale: 1.02 }"
              class="w-full rounded-2xl border-2 border-primary-400/50 focus:border-primary-500 focus:outline-none bg-primary-700 text-secondary-300 p-3 pl-12 placeholder:text-secondary-300"
              @input="debouncedFetchSuggestions(searchQuery)"
              @focus="showSuggestions = true"
              @blur="handleBlur"
            />
            <Icon
              :icon="isLoadingSuggestions ? 'mdi:loading' : 'mdi:search'"
              :class="[
                'text-secondary-300 text-3xl absolute left-2 top-1/2 -translate-y-1/2',
                { 'animate-spin': isLoadingSuggestions },
              ]"
            />
            <div
              v-if="
                showSuggestions &&
                (suggestions.length > 0 || isLoadingSuggestions)
              "
              class="absolute z-50 w-full mt-2 bg-primary-800 rounded-xl border border-secondary-500/20 shadow-xl backdrop-blur-lg overflow-hidden"
            >
              <div
                v-if="isLoadingSuggestions"
                class="p-4 text-center text-secondary-300"
              >
                Searching...
              </div>
              <div v-else class="max-h-80 overflow-y-auto">
                <motion.div
                  v-for="(movie, index) in suggestions"
                  :key="movie.id"
                  :initial="{ opacity: 0, y: 20 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ delay: index * 0.05 }"
                  class="group p-3 hover:bg-primary-700/50 cursor-pointer transition-all duration-300"
                  @mousedown.prevent="selectSuggestion(movie)"
                >
                  <div class="flex items-center gap-3">
                    <img
                      v-if="movie.poster_path"
                      :src="`https://image.tmdb.org/t/p/w92${movie.poster_path}`"
                      :alt="movie.title"
                      class="w-12 h-16 object-cover rounded-lg"
                    />
                    <div
                      v-else
                      class="w-12 h-16 bg-primary-900 rounded-lg flex items-center justify-center"
                    >
                      <Icon
                        icon="mdi:movie"
                        class="text-secondary-500 text-2xl"
                      />
                    </div>
                    <div class="flex-1">
                      <h4
                        class="text-secondary-300 font-medium group-hover:text-secondary-200"
                      >
                        {{ movie.title }}
                      </h4>
                      <p class="text-secondary-400 text-sm">
                        {{
                          movie.release_date
                            ? new Date(movie.release_date).getFullYear()
                            : "N/A"
                        }}
                      </p>
                    </div>
                    <div
                      class="flex items-center gap-1.5 bg-primary-900/80 px-2.5 py-1 rounded-lg"
                    >
                      <Icon icon="mdi:star" class="text-secondary-500" />
                      <span class="text-secondary-300 text-sm">
                        {{ movie.vote_average.toFixed(1) }}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </form>
        </motion.div> -->
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { motion } from "motion-v";
import { ref, watch } from "vue";
import { useMovieStore } from "../stores/movies";
import {
  PressScale,
  slideFromLeft,
  slideFromRight,
  hoverBounce,
} from "../constants/motion";
import type { Movie } from "../../types/movie";
import { searchMovies } from "../services/movies";
const movieStore = useMovieStore();
const searchQuery = ref("");
const showSuggestions = ref(false);
const suggestions = ref<Movie[]>([]);
const isLoadingSuggestions = ref(false);
const debounce = (fn: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
const fetchSuggestions = async (query: string) => {
  if (!query) {
    suggestions.value = [];
    return;
  }
  try {
    isLoadingSuggestions.value = true;
    const result = await searchMovies(query);
    if (result) {
      suggestions.value = result.results.slice(0, 5);
    }
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    suggestions.value = [];
  } finally {
    isLoadingSuggestions.value = false;
  }
};
const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);
const handleSearch = async () => {
  if (!searchQuery.value) return;
  await movieStore.setSearchQuery(searchQuery.value);
  showSuggestions.value = false;
};
const selectSuggestion = async (movie: Movie) => {
  searchQuery.value = movie.title;
  await movieStore.setSearchQuery(movie.title);
  showSuggestions.value = false;
};
const handleBlur = () => {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 200);
};
watch(
  () => movieStore.movies,
  () => {
    showSuggestions.value = false;
  }
);
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
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: var(--color-secondary-500) var(--color-primary-900);
}
.overflow-y-auto::-webkit-scrollbar {
  width: 0.375rem;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: var(--color-primary-900);
  border-radius: 0.5rem;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: var(--color-secondary-500);
  border-radius: 0.5rem;
}
</style>
