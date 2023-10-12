import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
import styles from './searchMenu.module.css';
import CustomSelect from '../../stylesMaterialUi/CustomSelect';
import CustomCtaButton from '../../stylesMaterialUi/CustomCtaButton';
// import CustomSelect from '../../stylesMaterialUi/CustomSelect';

function SearchMenu({
  toggleMenuActive, toggleSearchActive, isSearchActive,
  handleSearch, onInputSearch, selectedValue }) {
  // const [searchResults, setSearchResults] = useState([]);
  // const [selectedValue, setSelectedValue] = useState('todas');

  const handleSearchClose = () => {
    toggleSearchActive();
    toggleMenuActive();
  };

  // const handleSearch = () => {
  //   const filteredResults = cardList.filter((card) =>
  //     // eslint-disable-next-line implicit-arrow-linebreak
  //     selectedValue === 'todas' || card.cardRare === selectedValue);
  //   setSearchResults(filteredResults);
  //   handleSearchClose();
  // };

  return (
    <div
      className={ `
      ${styles.search_menu_container}
      ${isSearchActive ? styles.active : ''}
    ` }
    >
      <div className={ styles.search_area }>
        <button
          type="button"
          className={ styles.close_menu }
          onClick={ handleSearchClose }
        >
          close
        </button>
        <h3 className={ styles.search_title }>Busque as cartas pela raridade</h3>
        <FormControl variant="standard" className={ styles.rare_input }>
          <CustomSelect
            labelId="rare-input-label"
            id="rare-input"
            name="cardRare"
            value={ selectedValue }
            onChange={ onInputSearch }
          >
            <MenuItem value="todas">Todas</MenuItem>
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="raro">Raro</MenuItem>
            <MenuItem value="muito_raro">Muito Raro</MenuItem>
          </CustomSelect>
        </FormControl>
        <CustomCtaButton
          type="button"
          color="primary"
          variant="contained"
          onClick={ handleSearch }
        >
          buscar
        </CustomCtaButton>

      </div>

    </div>
  );
}

SearchMenu.propTypes = {
  isSearchActive: PropTypes.bool,
  toggleSearchActive: PropTypes.func.isRequired,
  toggleMenuActive: PropTypes.func.isRequired,
  onInputSearch: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

SearchMenu.defaultProps = {
  isSearchActive: false,
};

export default SearchMenu;
