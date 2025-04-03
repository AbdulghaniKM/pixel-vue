import type { MovieGenreResponse, MovieResponse } from "../../types/movie";
import api from "../plugins/axios";
export const getMovies = async (page: number = 1) => {
  const today = new Date().toISOString().split("T")[0];
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const sixMonthsAgoStr = sixMonthsAgo.toISOString().split("T")[0];
  const response = await api.get<MovieResponse>(`discover/movie`, {
    params: {
      page,
      sort_by: "popularity.desc",
      "vote_average.gte": 1,
      "primary_release_date.lte": today,
      "primary_release_date.gte": sixMonthsAgoStr,
      with_original_language: "en",
    },
  });
  return response.data;
};
export const getGenres = async () => {
  const response = await api.get<MovieGenreResponse>("genre/movie/list");
  return response.data.genres;
};
