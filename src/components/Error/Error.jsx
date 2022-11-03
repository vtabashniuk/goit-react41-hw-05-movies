import PropTypes from 'prop-types';
import styles from './Error.module.css';

export const Error = ({ errorMessage }) => {
  return (
    <>
      <h2 className={styles.title}>Loading error...</h2>
      <p className={styles.message}>Please try again later</p>
      <p className={styles.errorMessage}>Error: {errorMessage}</p>
    </>
  );
};

Error.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};
