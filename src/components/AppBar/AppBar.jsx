import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './AppBar.module.css';
import routes from 'routes/routes';

export const AppBar = ({ labels }) => {
  return (
    <>
      <nav>
        <ul className={styles.list}>
          {labels.map((label, i) => (
            <NavLink key={i} to={routes[label]} className={styles.link}>
              {label}
            </NavLink>
          ))}
        </ul>
      </nav>
    </>
  );
};

AppBar.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
};
