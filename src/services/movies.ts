import type { MovieGenreResponse, MovieResponse } from "../../types/movie";
import api from "../plugins/axios";

export const getMovies = async (page: number = 1) => {
  const today = new Date().toISOString().split("T")[0];
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const sixMonthsAgoStr = sixMonthsAgo.toISOString().split("T")[0];
  const response = await api.get<MovieResponse>(`movie/top_rated`, {
    params: {
      page,
    },
  });
  return response.data;
};

export const searchMovies = async (query: string, page: number = 1) => {
  if (!query) return null;
  const response = await api.get<MovieResponse>(`search/movie`, {
    params: {
      query,
      page,
    },
  });
  return response.data;
};

export const getGenres = async () => {
  const response = await api.get<MovieGenreResponse>("genre/movie/list");
  return response.data.genres;
};
