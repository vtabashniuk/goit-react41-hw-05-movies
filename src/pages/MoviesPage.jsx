import { SearchBar } from 'components/SearchBar/SearchBar';
import { MovieList } from 'components/MovieList/MovieList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchMovies } from '../api/fetchFunction';

const MoviesPage = () => {
  const handleSubmit = value => {
    setSearchParams({ query: value });
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState([]);

  useEffect(() => {
    const query = searchParams.get('query');
    if (!query?.length) {
      return;
    } else {
      const fetchData = async query => {
        const { results, total_pages } = await getSearchMovies(query);
        setMovies(results);
        setTotalPages(total_pages);
      };
      fetchData(query);
    }
  }, [searchParams]);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
};

export default MoviesPage;
