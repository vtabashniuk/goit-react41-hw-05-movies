import { SearchBar } from 'components/SearchBar/SearchBar';
import { MovieList } from 'components/MovieList/MovieList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchMovies, getConfiguration } from '../api/fetchFunction';
import { makeImagePath } from '../utils/makeImagePath';

const MoviesPage = () => {
  const handleSubmit = value => {
    setSearchParams({ query: value });
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  // const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const query = searchParams.get('query');
    if (!query?.length) {
      return;
    } else {
      const fetchData = async query => {
        const { results, total_pages } = await getSearchMovies(query);
        const { secure_base_url, poster_sizes } = await getConfiguration();
        const searchedMovies = results.map(item => ({
          id: item.id,
          title: item.title,
          posterImagePath: makeImagePath(
            secure_base_url,
            poster_sizes,
            item.poster_path,
            'details'
          ),
        }));
        setMovies(searchedMovies);
        setTotalPages(total_pages);
      };
      fetchData(query);
    }
  }, [searchParams]);

  return (
    <>
      {/* temporary  */}
      {console.log(totalPages)}
      <SearchBar onSubmit={handleSubmit} />
      <div className="container">
        {movies.length > 0 && <MovieList movies={movies} />}
      </div>
    </>
  );
};

export default MoviesPage;
