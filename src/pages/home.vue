<script setup lang="ts">
import { useMovieStore } from "../stores/movies";
import { onMounted, ref } from "vue";
import GenreList from "../components/GenreList.vue";
import MovieCard from "../components/MovieCard.vue";
import type { Movie } from "../../types/movie";

const movieStore = useMovieStore();
const selectedGenre = ref<number>();

const handleGenreSelect = (genreId: number) => {
  selectedGenre.value = selectedGenre.value === genreId ? undefined : genreId;
};

const handleMovieClick = (movie: Movie) => {
  // TODO: Navigate to movie details page
  console.log("Movie clicked:", movie.title);
};

onMounted(async () => {
  await movieStore.fetchGenres();
  await movieStore.fetchMovies();
});
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <section class="flex flex-col items-center gap-4 mb-12">
      <h1 class="text-secondary-300 text-4xl font-bold">
        Welcome to PixelVue, Your Go-To Place for Movies
      </h1>
      <p class="text-secondary-300 text-sm">
        Discover the latest movies, TV shows, and more with our easy-to-use
        platform.
      </p>
    </section>

    <!-- Genres List -->
    <GenreList
      :genres="movieStore.genres"
      :selected-genre="selectedGenre"
      @select="handleGenreSelect"
    />

    <!-- Movies Grid -->
    <div
      v-if="movieStore.isLoading"
      class="flex justify-center items-center min-h-[20rem]"
    >
      <div class="text-secondary-300">Loading movies...</div>
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8"
    >
      <MovieCard
        v-for="movie in movieStore.movies"
        :key="movie.id"
        :movie="movie"
        :genres="movieStore.genres"
        @click="handleMovieClick"
      />
    </div>

    <!-- Pagination -->
    <div class="flex justify-center gap-4 mt-12">
      <button
        @click="movieStore.fetchMovies(movieStore.currentPage - 1)"
        :disabled="movieStore.currentPage === 1"
        class="px-6 py-2.5 rounded-lg bg-secondary-800/50 text-secondary-300 disabled:opacity-50 hover:bg-secondary-700 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-900/20 disabled:hover:shadow-none disabled:hover:bg-secondary-800/50 font-medium"
      >
        Previous
      </button>
      <span class="text-secondary-300 flex items-center font-medium">
        Page {{ movieStore.currentPage }} of {{ movieStore.totalPages }}
      </span>
      <button
        @click="movieStore.fetchMovies(movieStore.currentPage + 1)"
        :disabled="movieStore.currentPage === movieStore.totalPages"
        class="px-6 py-2.5 rounded-lg bg-secondary-800/50 text-secondary-300 disabled:opacity-50 hover:bg-secondary-700 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-900/20 disabled:hover:shadow-none disabled:hover:bg-secondary-800/50 font-medium"
      >
        Next
      </button>
    </div>
  </main>
</template>

<style>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
