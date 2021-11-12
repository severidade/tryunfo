import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,

      onInputChange,
      isSaveButtonDisabled,
      onSaveButtonClick,
    } = this.props;

    return (
      <div className="content_AddNewCard">
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
              data-testid="description-input"
              value={ cardDescription }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="attr1-input">
            Attr01
            <input
              id="attr1-input"
              type="number"
              value={ cardAttr1 }
              data-testid="attr1-input"
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="attr2-input">
            Attr02
            <input
              id="attr2-input"
              type="number"
              value={ cardAttr2 }
              data-testid="attr2-input"
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="attr3-input">
            Attr03
            <input
              id="attr3-input"
              type="number"
              value={ cardAttr3 }
              data-testid="attr3-input"
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="img">
            Imagem
            <input
              id="img"
              type="text"
              value={ cardImage }
              data-testid="image-input"
              onChange={ onInputChange }
            />
          </label>

          <label htmlFor="rare-input">
            Raridade:
            <select
              name="rare-input"
              data-testid="rare-input"
              value={ cardRare }
              onChange={ onInputChange }
            >
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>

          <label htmlFor="superTrunfo">
            Super Trybe Trunfo
            <input
              id="superTrunfo"
              type="checkbox"
              name="superTrunfo"
              data-testid="trunfo-input"
              checked={ cardTrunfo }
              // lembrar de validar no constructor
              onChange={ onInputChange }
            />
          </label>

          <button
            type="button"
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
  isSaveButtonDisabled: PropTypes.bool.isRequired,

  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
