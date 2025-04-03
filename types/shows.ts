export interface ShowResponse {
  page: number;
  results: Show[];
  total_pages: number;
  total_results: number;
}

export interface Show {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface ShowGenre {
  id: number;
  name: string;
}

export interface ShowGenreResponse {
  genres: ShowGenre[];
}
