import { useParams, useNavigate, NavLink, Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getMovieDetail, getConfiguration } from 'api/fetchFunction';
import { makeImagePath } from '../utils/makeImagePath';
import { Button } from 'components/commons/Button/Button';
import noImagePlaceholder from 'no-image-placeholder.svg';

const SingleMoviePage = () => {
  const { id } = useParams();
  const isFirstRender = useRef(true);
  const [movieInfo, setMovieInfo] = useState(null);
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
      const { secure_base_url, poster_sizes } = await getConfiguration();
      const posterImagePath = makeImagePath(
        secure_base_url,
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

  if (movieInfo)
    return (
      <>
        <div className="container">
          <h1 className="pageTitle">{movieInfo.original_title}</h1>
          <Button
            label="&#8666; Go Back &#8666;"
            onClick={() => navigate(-1)}
            isFixed
          />
          <div className="movieThumb">
            <img
              className="movieImage"
              src={movieInfo.posterImagePath}
              alt={`Poster: ${movieInfo.original_title}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = noImagePlaceholder;
              }}
            />
            <div className="movieDescription">
              <p>Release date: {movieInfo.release_date}</p>
              <h3>Genres:</h3>
              <ul>
                {movieInfo.genres.map(({ id, name }) => (
                  <li key={id}>{name}</li>
                ))}
              </ul>
              <h3>Overview</h3>
              <p className="movieOverview">{movieInfo.overview}</p>
              <div className="additionalSection">
                <h3>Additional info</h3>
                <ul className="movieAdditionalList">
                  <li>
                    <NavLink
                      to={'cast'}
                      className={({ isActive }) =>
                        isActive
                          ? 'movieAdditionalLink activeMovieAdditionalLink'
                          : 'movieAdditionalLink'
                      }
                    >
                      cast
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={'reviews'}
                      className={({ isActive }) =>
                        isActive
                          ? 'movieAdditionalLink activeMovieAdditionalLink'
                          : 'movieAdditionalLink'
                      }
                    >
                      reviews
                    </NavLink>
                  </li>
                </ul>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default SingleMoviePage;
