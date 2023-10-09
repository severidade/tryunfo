import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import styles from './searchMenu.module.css';
// import CustomSelect from '../../stylesMaterialUi/CustomSelect';

function SearchMenu({ toggleMenuActive, toggleSearchActive, isSearchActive }) {
  const handleSearchButtonClick = () => {
    toggleSearchActive();
    toggleMenuActive();
  };
  return (
    <div
      className={ `
      ${styles.search_menu_container}
      ${isSearchActive ? styles.active : ''}
    ` }
    >
      menu de busca
      <FormControl variant="standard" className={ styles.rare_input }>
        <Select
          labelId="rare-input-label"
          id="rare-input"
          name="cardRare" // Nome do campo que será enviado ao `onInputChange`
          data-testid="rare-input"
          value="todas"
          // value={ cardRareSearch }
          // onChange={ onInputChange }
        >
          <MenuItem value="todas">Todas</MenuItem>
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="raro">Raro</MenuItem>
          <MenuItem value="muito raro">Muito Raro</MenuItem>
        </Select>
      </FormControl>
      <button
        type="button"
        onClick={ handleSearchButtonClick }
      >
        close
      </button>
    </div>
  );
}

SearchMenu.propTypes = {
  isSearchActive: PropTypes.bool,
  toggleSearchActive: PropTypes.func.isRequired,
  toggleMenuActive: PropTypes.func.isRequired,
};

SearchMenu.defaultProps = {
  isSearchActive: false,
};

export default SearchMenu;
