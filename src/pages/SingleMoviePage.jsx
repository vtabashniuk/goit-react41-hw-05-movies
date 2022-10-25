import { useParams, useNavigate, Link, Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getMovieDetail, getConfiguration } from 'api/fetchFunction';
import { makeImagePath } from '../utils/makeImagePath';

const SingleMoviePage = () => {
  const { id } = useParams();
  const isFirstRender = useRef(true);
  const [movieInfo, setMovieInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const fetchData = async id => {
      const {
        genres,
        original_title,
        homepage,
        release_date,
        overview,
        poster_path,
      } = await getMovieDetail(id);
      const { base_url, poster_sizes } = await getConfiguration();
      const posterImagePath = makeImagePath(
        base_url,
        poster_sizes,
        poster_path,
        'details'
      );
      setMovieInfo({
        genres,
        original_title,
        homepage,
        release_date,
        overview,
        posterImagePath,
      });
    };
    fetchData(id);
  }, [id]);

  return (
    <>
      <h1>Single Movie Page</h1>
      <button onClick={() => navigate(-1)}>go back</button>
      {movieInfo.original_title}
      <img
        src={movieInfo.posterImagePath}
        alt={`Poster: ${movieInfo.original_title}`}
      />
      <Link to={'cast'}>cast</Link>
      <Link to={'reviews'}>reviews</Link>
      <Outlet />
    </>
  );
};

export default SingleMoviePage;
