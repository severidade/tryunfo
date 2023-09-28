/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PreviewButton from '../PreviewButton';
import styles from './form.module.css';
import NumberInput from '../NumberInput';

function Form(props) {
  const {
    cardName,
    cardDescription,
    cardAttr1,
    cardAttr2,
    cardAttr3,
    cardImage,
    cardRare,
    cardTrunfo,
    hasTrunfo,
    onInputChange,
    isSaveButtonDisabled,
    remainingPower,
    onSaveButtonClick,
    togglePreview,
    showErrorMessage,
  } = props;

  // const [value, setValue] = useState(0);

  const handleInputFocus = (event) => {
    event.target.value = '0';
  };

  // const handleIncrement = () => {
  //   setValue(value + 1);
  // };

  // const handleDecrement = () => {
  //   if (value > 0) {
  //     setValue(value - 1);
  //   }
  // };

  return (
    <div className={ styles.card_front }>
      <div className={ styles.header_card_front }>
        <h2 className={ styles.heder_card_title }>Nova Carta </h2>
        <PreviewButton togglePreview={ togglePreview } isFromForm />
      </div>
      <form className={ styles.form_new_card }>
        <TextField
          id="standard-basic"
          name="cardName"
          data-testid="name-input"
          label="Nome"
          value={ cardName }
          onChange={ onInputChange }
          variant="standard"
        />
        <TextField
          className={ styles.descripition }
          id="standard-textarea"
          label="Descrição"
          name="cardDescription"
          data-testid="description-input"
          rows={ 1 }
          multiline
          variant="standard"
          value={ cardDescription }
          onChange={ onInputChange }
        />

        {/* <label htmlFor="attr1-input">
          Força
          <input
            id="attr1-input"
            type="number"
            name="cardAttr1"
            value={ cardAttr1 }
            data-testid="attr1-input"
            onChange={ onInputChange }
            min="0"
            max="90"
            onFocus={ handleInpu
              tFocus }
          />
        </label> */}

        <NumberInput
          attribute="attr1"
          name="cardAttr1"
          label="Força"
          value={ cardAttr1.toString() }
          focus={ handleInputFocus }
          change={ onInputChange }
        />

        <label htmlFor="attr2-input">
          Defesa
          <input
            id="attr2-input"
            type="number"
            name="cardAttr2"
            value={ cardAttr2 }
            data-testid="attr2-input"
            onChange={ onInputChange }
            min="0"
            max="90"
            onFocus={ handleInputFocus }
          />
        </label>
        <label htmlFor="attr3-input">
          Agilidade
          <input
            id="attr3-input"
            type="number"
            name="cardAttr3"
            value={ cardAttr3 }
            data-testid="attr3-input"
            onChange={ onInputChange }
            min="0"
            max="90"
            onFocus={ handleInputFocus }
          />
        </label>

        <div className="remaining_power">
          {showErrorMessage ? 'A soma de poderes é de no máximo 210'
            : `Poder restante: ${remainingPower}`}
        </div>

        <TextField
          id="standard-textarea"
          label="Imagem"
          name="cardImage"
          data-testid="description-input"
          // placeholder="Placeholder"
          variant="standard"
          value={ cardImage }
          onChange={ onInputChange }
        />

        {/* <label htmlFor="rare-input">
          Raridade:
          <select
            name="cardRare"
            data-testid="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label> */}

        <div className={ styles.footer_form_card }>
          <FormControl variant="standard" className={ styles.rare_input }>
            {/* <InputLabel id="rare-input-label">Raridade</InputLabel> */}
            <Select
              labelId="rare-input-label"
              id="rare-input"
              name="cardRare" // Nome do campo que será enviado ao `onInputChange`
              data-testid="rare-input"
              value={ cardRare }
              onChange={ onInputChange }
            >
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="raro">Raro</MenuItem>
              <MenuItem value="muito raro">Muito Raro</MenuItem>
            </Select>
          </FormControl>

          <label
            htmlFor="trunfo-input"
            className={ styles.super_trunfo }
          >
            Super Trunfo
            {hasTrunfo ? (
              <p>Você já tem um Super Trunfo em seu baralho</p>
            ) : (
              <input
                id="trunfo-input"
                type="checkbox"
                name="cardTrunfo"
                data-testid="trunfo-input"
                checked={ cardTrunfo }
                onChange={ onInputChange }
              />
            )}
          </label>
        </div>

        <button
          type="submit"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>

      </form>

      {/* <PreviewButton togglePreview={ togglePreview } /> */}

    </div>
  );
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  remainingPower: PropTypes.number.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  showErrorMessage: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  togglePreview: PropTypes.func.isRequired,
};

export default Form;
