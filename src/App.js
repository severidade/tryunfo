/* eslint-disable no-magic-numbers */
import React, { useState, useCallback } from 'react';
import Form from './components/Form/index';
import Card from './components/Card/index';
import validateForm from './utils/validation';
import './App.css';

const initialState = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '',
  cardAttr2: '',
  cardAttr3: '',
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
  hasTrunfo: false,
  remainingPower: 210,
  isSaveButtonDisabled: true,
  cardlist: [],
};

const App = () => {
  const [cardState, setCardState] = useState(initialState);

  const onInputChange = useCallback(({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    // impede que valor seja maior que 90
    const sanitizedValue = name.startsWith('cardAttr') && Number(value) > 90
      ? '90' : value;

    setCardState((prevState) => ({
      ...prevState,
      [name]: sanitizedValue,
      isSaveButtonDisabled: !validateForm({ ...prevState, [name]: sanitizedValue }),
    }));
  }, []);

  const onSaveButtonClick = useCallback((event) => {
    event.preventDefault();

    const updatedCardState = {
      ...initialState,
      cardlist: [cardState, ...cardState.cardlist],
      hasTrunfo: cardState.cardTrunfo,
    };

    setCardState(updatedCardState);
  }, [cardState]);

  return (
    <div>
      <h1>Tryunfs</h1>
      <div className="conteiner_NewCard">
        <Form
          onInputChange={ onInputChange }
          { ...cardState }
          onSaveButtonClick={ onSaveButtonClick }
        />
        <Card { ...cardState } />
      </div>
      <div className="conteiner_SavedCard">
        <h2>Cartas Salvas</h2>
        {cardState.cardlist.map((card, i) => (
          <Card key={ i } { ...card } />
        ))}
      </div>
    </div>
  );
};

export default App;
