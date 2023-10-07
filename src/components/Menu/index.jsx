import React from 'react';
import PropTypes from 'prop-types';
import styles from './menu.module.css';

function Menu({ cardList, toggleMenuActive, isMenuActive }) {
  // const { cardList } = props;
  const hasCard = cardList.length;

  return (
    <div className={ ` ${styles.container_menu} ${hasCard > 0 ? styles.show_menu : ''}` }>
      <button
        type="button"
        className={ `
          ${styles.menu} 
          ${hasCard > 0 ? styles.show_menu : ''}
          ${isMenuActive ? styles.active : ''}
        ` }
        onClick={ toggleMenuActive }
      >
        Menu
      </button>

      <button
        type="button"
        className={ styles.menu_mask }
        onClick={ toggleMenuActive }
      >
        mascara
      </button>

      <button
        type="button"
        className={ ` 
          ${styles.menu_item} 
          ${styles.search}
          ${isMenuActive ? styles.active : ''}
          ` }
      >
        Pesquisar
      </button>

      <button
        type="button"
        className={ ` 
        ${styles.menu_item} 
        ${styles.play}
        ${isMenuActive ? styles.active : ''}
        ` }
      >
        Play
      </button>

      <button
        type="button"
        // className={ ` ${styles.menu_item} ${styles.info}` }
        className={ ` 
        ${styles.menu_item} 
        ${styles.info}
        ${isMenuActive ? styles.active : ''}
        ` }
      >
        Info
      </button>
    </div>

  );
}

Menu.propTypes = {
  cardList: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleMenuActive: PropTypes.func.isRequired,
  isMenuActive: PropTypes.bool,
};

Menu.defaultProps = {
  isMenuActive: false,
};

export default Menu;
