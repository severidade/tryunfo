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
  remainingPower: 210,
  isSaveButtonDisabled: true,
  cardList: [],
};

const App = () => {
  const [cardState, setCardState] = useState(initialState);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [hasTrunfo, setHasTrunfo] = useState(false);

  const onInputChange = useCallback(({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const maxValue = 90;

    const maximumInputValue = name.startsWith('cardAttr')
      && Number(value) > maxValue
      ? '90' : value;

    if (target.getAttribute('data-type') === 'file') {
      // Se o campo é um campo de arquivo, leia o arquivo como Data URL
      const file = target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageDataURL = e.target.result;
          const updatedCardState = {
            ...cardState,
            [name]: imageDataURL,
          };
          // setCardState(updatedCardState);
          console.log(updatedCardState);
        };
        reader.readAsDataURL(file);
      }
      // console.log('passei aqui obando');
    } else {
      const updatedCardState = {
        ...cardState,
        [name]: maximumInputValue,
      };

      const sumAttrs = ['cardAttr1', 'cardAttr2', 'cardAttr3'];
      const sum = sumAttrs.reduce((total, attr) => total
          + Number(updatedCardState[attr]), 0);

      if (sum <= initialState.remainingPower) {
        updatedCardState.isSaveButtonDisabled = !validateForm(updatedCardState);
        updatedCardState.remainingPower = initialState.remainingPower - sum;
        setCardState(updatedCardState);
        setShowErrorMessage(false);
      } else {
        setShowErrorMessage(true);
      }
      console.log(updatedCardState);
    }
  }, [cardState]);

  const onSaveButtonClick = useCallback((event) => {
    event.preventDefault();

    const updatedCardState = {
      ...initialState,
      cardList: [cardState, ...cardState.cardList],
      hasTrunfo: cardState.cardTrunfo ? true : hasTrunfo,
    };

    setCardState(updatedCardState);

    // Atualize o estado separado hasTrunfo
    setHasTrunfo(updatedCardState.hasTrunfo);
    // console.log(cardState.cardList[0].cardImage);
  }, [cardState, hasTrunfo]);

  return (
    <div className="container_app">
      <h1>Tryunfs</h1>
      <div className="build_container">
        <Form
          onInputChange={ onInputChange }
          { ...cardState }
          onSaveButtonClick={ onSaveButtonClick }
          showErrorMessage={ showErrorMessage }
          hasTrunfo={ hasTrunfo }
        />
        <Card { ...cardState } />
      </div>
      <div className="container_saved_card">
        <h2>Cartas Salvas</h2>
        {cardState.cardList.map((card, i) => (
          <Card key={ i } { ...card } />
        ))}
      </div>
    </div>
  );
};

export default App;
