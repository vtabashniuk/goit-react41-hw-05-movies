import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';

export const SearchBar = ({ onSubmit }) => {
  const handleSubmit = ({ query }, actions) => {
    onSubmit(query);
    actions.resetForm();
  };

  return (
    <header className={styles.searchbar}>
      <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
        <Form autoComplete="off" className={styles.searchForm}>
          <button type="submit" className={styles.searchForm_button}>
            <span className={styles.searchForm_button_label}>Search</span>
          </button>
          <Field
            className={styles.searchForm_input}
            type="text"
            autoFocus
            autoComplete="off"
            placeholder="Search movies"
            name="query"
          />
        </Form>
      </Formik>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
