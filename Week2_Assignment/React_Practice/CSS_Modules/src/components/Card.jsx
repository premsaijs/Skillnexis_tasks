import PropTypes from 'prop-types';
import styles from './Card.module.css';

// styles.card etc come from the CSS module - class names get scoped automatically at build time
function Card({ title, badge, children }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>
        {title} <span className={styles.badge}>{badge}</span>
      </h3>
      <p>{children}</p>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  badge: PropTypes.string,
  children: PropTypes.node
};

Card.defaultProps = {
  badge: 'New',
  children: null
};

export default Card;
