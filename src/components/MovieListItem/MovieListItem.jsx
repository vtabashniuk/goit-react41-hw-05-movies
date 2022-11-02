import styles from './MovieListItem.module.css';
import PropTypes from 'prop-types';
import noImagePlaceholder from 'no-image-placeholder.svg';

export const MovieListItem = ({ poster, title }) => {
  return (
    <div className={styles.thumb}>
      <img
        src={poster}
        alt={`Poster: ${title}`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = noImagePlaceholder;
        }}
      />
      <p className={styles.title}>
        {title.length < 30 ? title : `${title.slice(0, 25)}...`}
      </p>
    </div>
  );
};

MovieListItem.propTypes = {
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
