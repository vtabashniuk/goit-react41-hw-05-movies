import { MovieList } from 'components/MovieList/MovieList';
import { getWeeklyTrending, getConfiguration } from 'api/fetchFunction';
import { makeImagePath } from '../utils/makeImagePath';
import { useState, useEffect } from 'react';

const HomePage = () => {
  // const isFirstRender = useRef(true);
  const [movies, setmovies] = useState([]);

  useEffect(() => {
    // if (isFirstRender.current) {
    //   isFirstRender.current = false;
    //   return;
    // }
    const fetchData = async () => {
      const { data } = await getWeeklyTrending('movie', 'week');
      const { base_url, poster_sizes } = await getConfiguration();
      const top20movies = data.results.map(item => ({
        id: item.id,
        title: item.title,
        posterImagePath: makeImagePath(
          base_url,
          poster_sizes,
          item.poster_path,
          'details'
        ),
      }));
      console.log(top20movies);
      console.log(data.results);
      setmovies(top20movies);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="homePageTitle">Week trending. Top 20</h1>
        {movies.length > 0 && <MovieList movies={movies} />}
      </div>
    </>
  );
};

export default HomePage;
