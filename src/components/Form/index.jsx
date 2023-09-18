import React from 'react';
import PropTypes from 'prop-types';
import styles from './form.module.css';

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
    showErrorMessage,
  } = props;

  const handleInputFocus = (event) => {
    event.target.value = '';
  };

  return (
    <div className={ styles.create_card_container }>
      <h2>Adicionar nova carta</h2>
      <form className="AddNewCard">
        <label htmlFor="cardName">
          Nome
          <input
            type="text"
            id="cardName"
            name="cardName"
            data-testid="name-input"
            value={ cardName }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição
          <textarea
            id="description-input"
            name="cardDescription"
            data-testid="description-input"
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>

        <p>Poderes</p>
        <label htmlFor="attr1-input">
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
            onFocus={ handleInputFocus }
          />
        </label>
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

        <label htmlFor="img">
          Imagem
          <input
            id="img"
            type="text"
            name="cardImage"
            value={ cardImage }
            data-testid="image-input"
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="rare-input">
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
        </label>

        <label htmlFor="trunfo-input">
          Super Trybe Trunfo
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

        <button
          type="submit"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
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
};

export default Form;
