import { MovieList } from 'components/MovieList/MovieList';
import { getWeeklyTrending } from 'api/fetchFunction';
import { useState, useEffect, useRef } from 'react';

const HomePage = () => {
  const isFirstRender = useRef(true);
  const [movies, setmovies] = useState([]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const fetchData = async () => {
      const { data } = await getWeeklyTrending('movie', 'week');
      setmovies(data.results);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Week trending. Top 20</h1>
        {movies.length > 0 && <MovieList movies={movies} />}
      </div>
    </>
  );
};

export default HomePage;
