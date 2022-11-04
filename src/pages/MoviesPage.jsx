import { SearchBar } from 'components/SearchBar/SearchBar';
import { MovieList } from 'components/MovieList/MovieList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchMovies, getConfiguration } from '../api/fetchFunction';
import { makeImagePath } from '../utils/makeImagePath';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { Error } from 'components/Error/Error';

const override = {
  display: 'block',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-200%, -50%)',
};

const MoviesPage = () => {
  const handleSubmit = value => {
    setSearchParams({ query: value });
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const query = searchParams.get('query');
    if (!query?.length) {
      return;
    } else {
      const fetchData = async query => {
        setIsLoading(true);
        try {
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
        } catch (error) {
          setErrorMessage(error.message);
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData(query);
    }
  }, [searchParams]);

  return (
    <>
      {/* temporary  */}
      {console.log(totalPages)}
      {isLoading && (
        <PacmanLoader
          color="#f7c23b"
          loading={isLoading}
          size={75}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      <SearchBar onSubmit={handleSubmit} />
      <div className="container">
        {errorMessage && <Error errorMessage={errorMessage} />}
        {movies.length > 0 && <MovieList movies={movies} />}
      </div>
    </>
  );
};

export default MoviesPage;
