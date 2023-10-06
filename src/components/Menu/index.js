import React from 'react';
import PropTypes from 'prop-types';
import styles from './menu.module.css';

function Menu(props) {
  const { cardList } = props;
  const hasCard = cardList.length;

  return (
    // <div className={ `${styles.menu} ${hasCard > 0 ? styles.open : ''}` } />
    <button
      type="button"
      className={ `${styles.menu} ${hasCard > 0 ? styles.open : ''}` }
      // onClick={ togglePreview }
    >
      Menu
    </button>

  );
}

Menu.propTypes = {
  cardList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Menu;
