import axios from "axios";
import type { Movie } from "../types/movie";

axios.defaults.baseURL = "https://api.themoviedb.org/3";


export interface TMDBResponse {
  results: Movie[];
  total_pages: number; 
  total_results: number;
}

export const fetchMovies = async (query: string, page: number = 1): Promise<TMDBResponse> => {
  const config = {
    params: {
      query: query,
      page: page, 
      include_adult: false,
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
  };

  const response = await axios.get<TMDBResponse>("/search/movie", config);
  return response.data; 
};