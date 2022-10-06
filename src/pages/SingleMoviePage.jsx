import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getMovieDetail } from 'api/fetchFunction';

const SingleMoviePage = () => {
  const { id } = useParams();
  const isFirstRender = useRef(true);
  const [movieInfo, setMovieInfo] = useState({});

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const fetchData = async id => {
      const { data } = await getMovieDetail(id);
      setMovieInfo({
        genres: data.genres,
        original_title: data.original_title,
        homepage: data.homepage,
        release_date: data.release_date,
        overview: data.overview,
        backdrop_path: data.backdrop_path,
      });
    };
    fetchData(id);
  }, [id]);

  return (
    <>
      <h1>Single Movie Page</h1>
      {movieInfo.original_title}
    </>
  );
};

export default SingleMoviePage;
