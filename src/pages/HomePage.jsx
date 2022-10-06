import { MovieList } from 'components/MovieList/MovieList';
import { getWeeklyTrending } from 'api/fetchFunction';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const [movies, setmovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('useEffect');
      const { data } = await getWeeklyTrending('movie', 'week');
      setmovies(data.results);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Week trending</h1>
        {movies.length > 0 && <MovieList movies={movies} />}
      </div>
    </>
  );
};

export default HomePage;
