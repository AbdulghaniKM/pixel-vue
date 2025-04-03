<script setup lang="ts">
import { useMovieStore } from "../stores/movies";
import { useShowStore } from "../stores/shows";
import { onMounted, ref, computed } from "vue";
import GenreList from "../components/GenreList.vue";
import MediaCard from "../components/MediaCard.vue";
import type { Movie } from "../../types/movie";
import type { Show } from "../../types/shows";

const movieStore = useMovieStore();
const showStore = useShowStore();
const selectedTab = ref<"Movies" | "TV Shows">("Movies");

const handleGenreSelect = (genreId: number) => {
  if (selectedTab.value === "Movies") {
    const newGenreId =
      movieStore.selectedGenreId === genreId ? undefined : genreId;
    movieStore.setSelectedGenre(newGenreId);
  } else {
    const newGenreId =
      showStore.selectedGenreId === genreId ? undefined : genreId;
    showStore.setSelectedGenre(newGenreId);
  }
};

const handleItemClick = (item: Movie | Show) => {
  if (selectedTab.value === "Movies") {
    console.log("Movie clicked:", (item as Movie).title);
  } else {
    console.log("Show clicked:", (item as Show).name);
  }
};

const isLoading = computed(() => {
  return selectedTab.value === "Movies"
    ? movieStore.isLoading
    : showStore.isLoading;
});

const currentItems = computed(() => {
  return selectedTab.value === "Movies"
    ? movieStore.filteredMovies
    : showStore.filteredShows;
});

const currentPage = computed(() => {
  return selectedTab.value === "Movies"
    ? movieStore.currentPage
    : showStore.currentPage;
});

const totalPages = computed(() => {
  return selectedTab.value === "Movies"
    ? movieStore.totalPages
    : showStore.totalPages;
});

const handleTabChange = async (tab: "Movies" | "TV Shows") => {
  selectedTab.value = tab;
  if (tab === "Movies") {
    await movieStore.fetchMovies(1);
  } else {
    await showStore.fetchShows(1);
  }
};

const handlePageChange = async (newPage: number) => {
  if (selectedTab.value === "Movies") {
    await movieStore.fetchMovies(newPage);
  } else {
    await showStore.fetchShows(newPage);
  }
};

onMounted(async () => {
  await movieStore.fetchGenres();
  await movieStore.fetchMovies();
  await showStore.fetchGenres();
});
</script>

<template>
  <main class="home-selection">
    <div class="container mx-auto px-4">
      <section class="flex flex-col items-center gap-4 mb-12">
        <h1 class="text-secondary-300 text-4xl font-bold">
          Welcome to PixelVue, Your Go-To Place for Entertainment
        </h1>
        <p class="text-secondary-300 text-sm">
          Discover movies, TV shows, and more with our easy-to-use platform.
        </p>
      </section>
    </div>
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center">
        <h1 class="text-secondary-300 text-4xl font-bold my-12">
          Top Rated {{ selectedTab }}
        </h1>
        <div class="flex items-center gap-2">
          <button
            @click="handleTabChange('Movies')"
            :class="[
              'px-4 py-2 rounded-lg transition-all duration-300',
              selectedTab === 'Movies'
                ? 'bg-secondary-700 text-secondary-300'
                : 'text-secondary-300 hover:bg-secondary-800/50',
            ]"
          >
            Movies
          </button>
          <button
            @click="handleTabChange('TV Shows')"
            :class="[
              'px-4 py-2 rounded-lg transition-all duration-300',
              selectedTab === 'TV Shows'
                ? 'bg-secondary-700 text-secondary-300'
                : 'text-secondary-300 hover:bg-secondary-800/50',
            ]"
          >
            TV Shows
          </button>
        </div>
      </div>
      <div
        v-if="isLoading"
        class="flex justify-center items-center min-h-[20rem]"
      >
        <div class="text-secondary-300">
          Loading {{ selectedTab.toLowerCase() }}...
        </div>
      </div>
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8"
      >
        <MediaCard
          v-for="item in currentItems"
          :key="item.id"
          :media="item"
          :genres="
            selectedTab === 'Movies' ? movieStore.genres : showStore.genres
          "
          :type="selectedTab === 'Movies' ? 'movie' : 'show'"
          @click="handleItemClick"
        />
      </div>
      <div v-if="!currentItems.length" class="text-center py-12">
        <p class="text-secondary-300 text-lg">
          No {{ selectedTab.toLowerCase() }} found matching your criteria.
        </p>
      </div>
      <div v-else class="flex justify-center gap-4 mt-12">
        <button
          @click="handlePageChange(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-6 py-2.5 rounded-lg bg-secondary-800/50 text-secondary-300 disabled:opacity-50 hover:bg-secondary-700 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-900/20 disabled:hover:shadow-none disabled:hover:bg-secondary-800/50 font-medium"
        >
          Previous
        </button>
        <span class="text-secondary-300 flex items-center font-medium">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button
          @click="handlePageChange(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-6 py-2.5 rounded-lg bg-secondary-800/50 text-secondary-300 disabled:opacity-50 hover:bg-secondary-700 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-900/20 disabled:hover:shadow-none disabled:hover:bg-secondary-800/50 font-medium"
        >
          Next
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home-selection {
  ::selection {
    background-color: var(--color-secondary-300);
    color: var(--color-primary-700);
  }
  ::-moz-selection {
    background-color: var(--color-secondary-300);
    color: var(--color-primary-700);
  }
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
