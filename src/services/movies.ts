import type { MovieGenreResponse, MovieResponse } from "../../types/movie";
import api from "../plugins/axios";

export const getMovies = async (page: number = 1) => {
  const response = await api.get<MovieResponse>(`discover/movie`, {
    params: {
      page,
      sort_by: "popularity.desc",
    },
  });
  return response.data;
};

export const getGenres = async () => {
  const response = await api.get<MovieGenreResponse>("genre/movie/list");
  return response.data.genres;
};
