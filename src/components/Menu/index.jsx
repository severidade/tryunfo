import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './menu.module.css';
import SearchMenu from '../SearchMenu';

function Menu({
  cardList,
  toggleMenuActive,
  toggleSearchActive,
  isMenuActive,
  isSearchActive,
}) {
  const hasCard = cardList.length;

  const maskButtonRef = useRef(null);
  let scrollStartY = 0;

  const handleScrollStart = (e) => {
    scrollStartY = e.touches[0].clientY;
  };

  const handleScrollEnd = (e) => {
    const scrollEndY = e.changedTouches[0].clientY;
    const scrollDistance = scrollEndY - scrollStartY;

    // eslint-disable-next-line no-magic-numbers
    if (Math.abs(scrollDistance) > 1) {
      toggleMenuActive();
    }
  };

  const handleInfoButtonClick = () => {
    const URL_DO_LINK_EXTERN0 = 'https://github.com/severidade/tryunfo';
    window.open(URL_DO_LINK_EXTERN0, '_blank');
    toggleMenuActive();
  };

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
        id="mask"
        className={ styles.menu_mask }
        onTouchStart={ handleScrollStart }
        onTouchEnd={ handleScrollEnd }
        onClick={ toggleMenuActive }
        ref={ maskButtonRef }
      >
        mascara
      </button>
      <SearchMenu
        isSearchActive={ isSearchActive }
        toggleMenuActive={ toggleMenuActive }
        toggleSearchActive={ toggleSearchActive }
      />
      <button
        type="button"
        onClick={ toggleSearchActive }
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
        onClick={ handleInfoButtonClick }
      >
        Info
      </button>

    </div>

  );
}

Menu.propTypes = {
  cardList: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleMenuActive: PropTypes.func.isRequired,
  toggleSearchActive: PropTypes.func.isRequired,
  isMenuActive: PropTypes.bool,
  isSearchActive: PropTypes.bool,
};

Menu.defaultProps = {
  isMenuActive: false,
  isSearchActive: false,
};

export default Menu;
