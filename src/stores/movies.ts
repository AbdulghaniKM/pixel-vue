import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Movie, MovieGenre } from "../../types/movie";
import { getGenres, getMovies, searchMovies } from "../services/movies";

export const useMovieStore = defineStore("movies", () => {
  const movies = ref<Movie[]>([]);
  const genres = ref<MovieGenre[]>([]);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const isLoading = ref(false);
  const searchQuery = ref("");
  const selectedGenreId = ref<number>();
  const isSearchMode = ref(false);

  const filteredMovies = computed(() => {
    let filtered = [...movies.value];

    // Apply genre filter if there's a selected genre
    if (selectedGenreId.value) {
      filtered = filtered.filter((movie) =>
        movie.genre_ids.includes(selectedGenreId.value!)
      );
    }

    return filtered;
  });

  async function fetchMovies(page?: number) {
    try {
      isLoading.value = true;
      if (page) {
        currentPage.value = page;
      }

      let data;
      if (isSearchMode.value && searchQuery.value) {
        data = await searchMovies(searchQuery.value, currentPage.value);
      } else {
        data = await getMovies(currentPage.value);
      }

      if (data) {
        movies.value = data.results;
        totalPages.value = Math.min(data.total_pages, 500); // TMDB limits to 500 pages
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      movies.value = [];
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
    await fetchMovies();
  }

  function setSelectedGenre(genreId: number | undefined) {
    selectedGenreId.value = genreId;
  }

  return {
    movies,
    genres,
    currentPage,
    totalPages,
    isLoading,
    searchQuery,
    selectedGenreId,
    isSearchMode,
    filteredMovies,
    fetchMovies,
    fetchGenres,
    setSearchQuery,
    setSelectedGenre,
  };
});
