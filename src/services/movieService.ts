import axios from "axios";
import { Movie } from "../types/movie";

// Отримуємо токен із .env (має починатися з VITE_)
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const movieInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/json",
  },
});

interface TMDBResponse {
  results: Movie[];
  total_results: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const { data } = await movieInstance.get<TMDBResponse>("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
    },
  });
  return data.results;
};