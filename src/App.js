import React, { useState, useCallback } from 'react';
import Form from './components/Form/index';
import Card from './components/Card/index';
import validateForm from './utils/validation';
import './App.css';

const initialState = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '0',
  cardAttr2: '0',
  cardAttr3: '0',
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
  hasTrunfo: false,
  remainingPower: 210,
  isSaveButtonDisabled: true,
  cardList: [],
};

const App = () => {
  const [cardState, setCardState] = useState(initialState);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const onInputChange = useCallback(({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const maxValue = 90;

    // impede que valor seja maior que 90
    const maximumInputValue = name.startsWith('cardAttr')
      && Number(value) > maxValue
      ? '90' : value;

    // Atualize os valores de cardAttr1, cardAttr2, cardAttr3
    const updatedCardState = {
      ...cardState,
      [name]: maximumInputValue,
    };

    // Calcula a soma dos valores atualizados
    const sumAttrs = ['cardAttr1', 'cardAttr2', 'cardAttr3'];
    const sum = sumAttrs.reduce((total, attr) => total
      + Number(updatedCardState[attr]), 0);

    // Verifica se a soma é maior que remainingPower
    if (sum <= initialState.remainingPower) {
      // Atualize o restante do estado do cartão
      updatedCardState.isSaveButtonDisabled = !validateForm(updatedCardState);

      // Atualize remainingPower subtraindo sum
      updatedCardState.remainingPower = initialState.remainingPower - sum;
      setCardState(updatedCardState);
      setShowErrorMessage(false);
    } else {
      setShowErrorMessage(true);
    }

    // console.log(`Nome: ${name}, Valor: ${value}`);
    // if (name.startsWith('cardAttr')) {
    //   console.log(`Nome: ${name}, Valor: ${value}`);
    // }
  }, [cardState]);

  const onSaveButtonClick = useCallback((event) => {
    event.preventDefault();

    const updatedCardState = {
      ...initialState,
      cardList: [cardState, ...cardState.cardList],
      hasTrunfo: cardState.cardTrunfo ? true : initialState.hasTrunfo,
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
          showErrorMessage={ showErrorMessage }
        />
        <Card { ...cardState } />
      </div>
      <div className="conteiner_SavedCard">
        <h2>Cartas Salvas</h2>
        {cardState.cardList.map((card, i) => (
          <Card key={ i } { ...card } />
        ))}
      </div>
    </div>
  );
};

export default App;
