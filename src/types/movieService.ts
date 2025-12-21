import axios from "axios";
import { Movie } from "../types/movie";

// 1. Отримуємо токен із змінної оточення
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

// 2. Базовий URL для всіх запитів
axios.defaults.baseURL = "https://api.themoviedb.org/3";

// Інтерфейс для відповіді від бекенда
interface TMDBResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  // Використовуємо структуру об'єкта конфігурації з твого завдання
  const config = {
    params: {
      query: query,
      include_adult: false,
      language: "en-US",
    },
    headers: {
      // Важливо: слово Bearer та пробіл перед токеном
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmZjYjQ1YThjZGQ2M2U2MzYxN2IyZTdmMTFlNDdlNyIsIm5iZiI6MTc2NjMyNzgzNy41NzIsInN1YiI6IjY5NDgwNjFkNTdkNDhkY2VmMWIxYzk2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PeKRNCwhsofK2MpZj8t5cePQ_WRIjgyVq8e_xfwCFJg`,
    },
  };

  const response = await axios.get<TMDBResponse>("/search/movie", config);
  
  // Повертаємо саме масив фільмів
  return response.data.results;
};