import PropTypes from 'prop-types';
import styles from './Button.module.css';

export const Button = ({ label, onClick, type, isFixed }) => {
  const styleClasses = isFixed
    ? [styles.button, styles.fixed].join(' ')
    : styles.button;

  return (
    <button type={type} onClick={onClick} className={styleClasses}>
      {label}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  onClick: () => {},
  isFixed: false,
};

Button.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isFixed: PropTypes.bool,
};
