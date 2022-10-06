import styles from './MovieList.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import routes from 'routes/routes';

export const MovieList = ({ movies }) => {
  console.log(movies);
  return (
    <ul className={styles.list}>
      {movies.map(movie => (
        <li key={movie.id}><NavLink to={`${routes.movies}/${movie.id}`}>{movie.title}</NavLink></li>
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
