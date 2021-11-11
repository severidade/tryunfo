import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <div id="content_AddNewCard">
        <h2>Adicionar nova carta</h2>
        <form id="add_card">
          <label htmlFor="name">
            Nome
            <input type="text" id="name" data-testid="name-input" />
          </label>
          <label htmlFor="description">
            Descrição
            <textarea id="description" data-testid="description-input" />
          </label>
          <label htmlFor="attr1-input">
            Attr01
            <input id="attr1-input" type="number" data-testid="attr1-input" />
          </label>
          <label htmlFor="attr2-input">
            Attr02
            <input id="attr2-input" type="number" data-testid="attr2-input" />
          </label>
          <label htmlFor="attr3-input">
            Attr03
            <input id="attr3-input" type="number" data-testid="attr3-input" />
          </label>
          <label htmlFor="img">
            Nome
            <input type="text" id="img" data-testid="image-input" />
          </label>
          <label htmlFor="rarity">
            Raridade:
            <select name="rarity" data-testid="rare-input">
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>
          <label htmlFor="super">
            Super Trybe Trunfo
            <input
              id="super"
              type="checkbox"
              name="superTrunfo"
              data-testid="trunfo-input"
            />
          </label>
          <button type="button" data-testid="save-button">
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
