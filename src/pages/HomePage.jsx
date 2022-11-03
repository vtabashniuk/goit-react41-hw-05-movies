import { MovieList } from 'components/MovieList/MovieList';
import { getWeeklyTrending, getConfiguration } from 'api/fetchFunction';
import { makeImagePath } from '../utils/makeImagePath';
import { useState, useEffect } from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { Error } from 'components/Error/Error';

const override = {
  display: 'block',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-200%, -50%)',
};

const HomePage = () => {
  const [movies, setmovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getWeeklyTrending('movie', 'week');
        const { secure_base_url, poster_sizes } = await getConfiguration();
        const top20movies = data.results.map(item => ({
          id: item.id,
          title: item.title,
          posterImagePath: makeImagePath(
            secure_base_url,
            poster_sizes,
            item.poster_path,
            'details'
          ),
        }));
        setmovies(top20movies);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <PacmanLoader
        color="#f7c23b"
        loading={isLoading}
        size={100}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className="container">
        <h1 className="pageTitle">Week trending. Top 20</h1>
        {movies.length > 0 && <MovieList movies={movies} />}
        {errorMessage && <Error errorMessage={errorMessage} />}
      </div>
    </>
  );
};

export default HomePage;
