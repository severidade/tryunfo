import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import styles from './searchMenu.module.css';
// import CustomSelect from '../../stylesMaterialUi/CustomSelect';

function SearchMenu({ toggleMenuActive, toggleSearchActive, isSearchActive, cardList }) {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedValue, setSelectedValue] = useState('todas');

  const handleSearchClose = () => {
    toggleSearchActive();
    toggleMenuActive();
  };

  const handleSearch = () => {
    const filteredResults = cardList.filter((card) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      selectedValue === 'todas' || card.cardRare === selectedValue);
    setSearchResults(filteredResults);
    handleSearchClose();
  };

  console.log(searchResults);
  return (
    <div
      className={ `
      ${styles.search_menu_container}
      ${isSearchActive ? styles.active : ''}
    ` }
    >
      menu de busca
      <button
        type="button"
        onClick={ handleSearchClose }
      >
        close
      </button>
      <FormControl variant="standard" className={ styles.rare_input }>
        <Select
          labelId="rare-input-label"
          id="rare-input"
          name="cardRare"
          value={ selectedValue }
          onChange={ (e) => setSelectedValue(e.target.value) }
        >
          <MenuItem value="todas">Todas</MenuItem>
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="raro">Raro</MenuItem>
          <MenuItem value="muito raro">Muito Raro</MenuItem>
        </Select>
      </FormControl>

      <button
        type="button"
        onClick={ handleSearch }
      >
        buscar
      </button>

    </div>
  );
}

SearchMenu.propTypes = {
  isSearchActive: PropTypes.bool,
  cardList: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleSearchActive: PropTypes.func.isRequired,
  toggleMenuActive: PropTypes.func.isRequired,
};

SearchMenu.defaultProps = {
  isSearchActive: false,
};

export default SearchMenu;
