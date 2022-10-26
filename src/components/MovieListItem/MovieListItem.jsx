import styles from './MovieListItem.module.css';
import PropTypes from 'prop-types';

export const MovieListItem = ({ poster, title }) => {
  return (
    <div className={styles.thumb}>
      <img src={poster} alt={title} />
      <p className={styles.title}>
        {title.length < 30 ? title : `${title.slice(0, 27)}...`}
      </p>
    </div>
  );
};

MovieListItem.propTypes = {
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
