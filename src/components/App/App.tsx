import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query"; 
import ReactPaginate from 'react-paginate'; 

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import css from "./App.module.css"; 

export default function App() {
  const [query, setQuery] = useState<string>(""); 
  const [page, setPage] = useState<number>(1);    
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page], 
    queryFn: () => fetchMovies(query, page),
    enabled: query !== "", 
    placeholderData: (previousData) => previousData, 
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1); 
    toast.success(`Шукаємо: ${newQuery}`)
  };

  const movies = data?.results || [];
  const totalPages = data?.total_pages || 0;

  return (
    <div className={css.appWrapper}>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      
      {movies.length > 0 && (
        <>
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
          
         
          {totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages > 500 ? 500 : totalPages} 
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  );
}