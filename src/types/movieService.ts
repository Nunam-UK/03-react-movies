import axios from "axios";
import type { Movie } from "../types/movie";




axios.defaults.baseURL = "https://api.themoviedb.org/3";


interface TMDBResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  
  const config = {
    params: {
      query: query,
      include_adult: false,
      language: "en-US",
    },
    headers: {
    
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmZjYjQ1YThjZGQ2M2U2MzYxN2IyZTdmMTFlNDdlNyIsIm5iZiI6MTc2NjMyNzgzNy41NzIsInN1YiI6IjY5NDgwNjFkNTdkNDhkY2VmMWIxYzk2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PeKRNCwhsofK2MpZj8t5cePQ_WRIjgyVq8e_xfwCFJg`,
    },
  };

  const response = await axios.get<TMDBResponse>("/search/movie", config);
  

  return response.data.results;
};