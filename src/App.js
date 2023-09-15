import React, { useState, useCallback } from 'react';
import Form from './components/Form';
import Card from './components/Card';
import validateForm from './utils/validation';
import './App.css';

const App = () => {
  const [cardState, setCardState] = useState({
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    cardlist: [],
  });

  const onInputChange = useCallback(({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setCardState((prevCardState) => ({
      ...prevCardState,
      [name]: value,
    }));

    const isValid = validateForm({
      ...cardState,
      [name]: value,
    });

    setCardState((prevState) => ({
      ...prevState,
      isSaveButtonDisabled: !isValid,
    }));
  }, [cardState]);

  const createNewCard = useCallback((newCard) => {
    setCardState((prevState) => ({
      ...prevState,
      cardlist: [newCard, ...prevState.cardlist],
    }));
  }, []);

  const onSaveButtonClick = useCallback((event) => {
    event.preventDefault();
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
      cardlist,
    } = cardState;

    createNewCard({
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      cardlist,
    });

    // Lógica de verificação de trunfo
    if (cardTrunfo === true) {
      setCardState((prevState) => ({
        ...prevState,
        hasTrunfo: true,
      }));
    }

    // Limpar os campos
    setCardState((prevState) => ({
      ...prevState,
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    }));
  }, [cardState, createNewCard]);

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
    isSaveButtonDisabled,
    cardlist,
  } = cardState;

  return (
    <div>
      <h1>Tryunfs</h1>
      <div className="conteiner_NewCard">
        <Form
          onInputChange={ onInputChange }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
      </div>
      <div className="conteiner_SavedCard">
        <h2>Cartas Salvas</h2>
        {cardlist.map((card, i) => (
          <Card
            key={ i }
            cardName={ card.cardName }
            cardDescription={ card.cardDescription }
            cardAttr1={ card.cardAttr1 }
            cardAttr2={ card.cardAttr2 }
            cardAttr3={ card.cardAttr3 }
            cardImage={ card.cardImage }
            cardRare={ card.cardRare }
            cardTrunfo={ card.cardTrunfo }
          />
        ))}
      </div>
    </div>
  );
};

export default App;
