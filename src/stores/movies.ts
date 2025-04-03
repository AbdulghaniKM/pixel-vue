import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Movie, MovieGenre } from "../../types/movie";
import { getGenres, getMovies } from "../services/movies";

export const useMovieStore = defineStore("movies", () => {
  const movies = ref<Movie[]>([]);
  const genres = ref<MovieGenre[]>([]);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const isLoading = ref(false);

  const getMoviesByGenre = computed(() => {
    return (genreId: number) =>
      movies.value.filter((movie: Movie) => movie.genre_ids.includes(genreId));
  });

  async function fetchMovies(page?: number) {
    try {
      isLoading.value = true;
      if (page) {
        currentPage.value = page;
      }
      const data = await getMovies(currentPage.value);
      movies.value = data.results;
      totalPages.value = data.total_pages;
    } catch (error) {
      console.error("Error fetching movies:", error);
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

  return {
    movies,
    genres,
    currentPage,
    totalPages,
    isLoading,
    getMoviesByGenre,
    fetchMovies,
    fetchGenres,
  };
});
