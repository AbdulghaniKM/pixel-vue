import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Show, ShowGenre } from "../../types/shows";
import { getGenres, getShows, searchShows } from "../services/shows";

export const useShowStore = defineStore("shows", () => {
  const shows = ref<Show[]>([]);
  const genres = ref<ShowGenre[]>([]);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const isLoading = ref(false);
  const searchQuery = ref("");
  const selectedGenreId = ref<number>();
  const isSearchMode = ref(false);

  const filteredShows = computed(() => {
    let filtered = [...shows.value];

    // Apply genre filter if there's a selected genre
    if (selectedGenreId.value) {
      filtered = filtered.filter((show) =>
        show.genre_ids.includes(selectedGenreId.value!)
      );
    }

    return filtered;
  });

  async function fetchShows(page?: number) {
    try {
      isLoading.value = true;
      if (page) {
        currentPage.value = page;
      }

      let data;
      if (isSearchMode.value && searchQuery.value) {
        data = await searchShows(searchQuery.value, currentPage.value);
      } else {
        data = await getShows(currentPage.value);
      }

      if (data) {
        shows.value = data.results;
        totalPages.value = Math.min(data.total_pages, 500); // TMDB limits to 500 pages
      }
    } catch (error) {
      console.error("Error fetching shows:", error);
      shows.value = [];
      totalPages.value = 1;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchGenres() {
    try {
      genres.value = await getGenres();
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  }

  async function setSearchQuery(query: string) {
    searchQuery.value = query;
    isSearchMode.value = !!query;
    currentPage.value = 1; // Reset to first page when searching
    await fetchShows();
  }

  function setSelectedGenre(genreId: number | undefined) {
    selectedGenreId.value = genreId;
  }

  return {
    shows,
    genres,
    currentPage,
    totalPages,
    isLoading,
    searchQuery,
    selectedGenreId,
    isSearchMode,
    filteredShows,
    fetchShows,
    fetchGenres,
    setSearchQuery,
    setSelectedGenre,
  };
});
