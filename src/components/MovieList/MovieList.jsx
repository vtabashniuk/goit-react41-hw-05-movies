import styles from './MovieList.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import routes from 'routes/routes';
import { MovieListItem } from 'components/MovieListItem/MovieListItem';

export const MovieList = ({ movies }) => {
  return (
    <ul className={styles.list}>
      {movies.map(movie => (
        <li key={movie.id}>
          <NavLink
            className={styles.link}
            to={`${routes.home}/${routes.movies}/${movie.id}`}
          >
            <MovieListItem
              poster={movie.posterImagePath}
              title={movie.title}
            />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
