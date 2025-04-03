import type { ShowGenreResponse, ShowResponse } from "../../types/shows";
import api from "../plugins/axios";

export const getShows = async (page: number = 1) => {
  const response = await api.get<ShowResponse>(`tv/top_rated`, {
    params: {
      page,
    },
  });
  return response.data;
};

export const searchShows = async (query: string, page: number = 1) => {
  if (!query) return null;
  const response = await api.get<ShowResponse>(`search/tv`, {
    params: {
      query,
      page,
    },
  });
  return response.data;
};

export const getGenres = async () => {
  const response = await api.get<ShowGenreResponse>("genre/tv/list");
  return response.data.genres;
};
