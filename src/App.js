import React, { useState, useCallback, useRef } from 'react';
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

  const [isPreviewFlipped, setIsPreviewFlipped] = useState(false);

  const savedCardSectionRef = useRef(null);

  const scrollToSavedCardSection = () => {
    if (savedCardSectionRef.current) {
      savedCardSectionRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

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
  }, [cardState]);

  const onSaveButtonClick = useCallback((event) => {
    event.preventDefault();

    const updatedCardState = {
      ...initialState,
      cardList: [cardState, ...cardState.cardList],
      hasTrunfo: cardState.cardTrunfo ? true : hasTrunfo,
    };

    setCardState(updatedCardState);
    scrollToSavedCardSection();

    // Atualize o estado separado hasTrunfo
    setHasTrunfo(updatedCardState.hasTrunfo);
  }, [cardState, hasTrunfo]);

  const togglePreview = () => {
    setIsPreviewFlipped((prevIsFlipped) => !prevIsFlipped);
  };

  return (
    <div className="container_app">
      <h1 className="logo">
        Super
        {' '}
        <strong>Trunfo</strong>
      </h1>

      <div className="container_preview_card">
        <div className={ `flip_card ${isPreviewFlipped ? 'flipped' : ''}` }>
          <div className="flip_card_inner">
            <Form
              onInputChange={ onInputChange }
              { ...cardState }
              onSaveButtonClick={ onSaveButtonClick }
              togglePreview={ togglePreview }
              showErrorMessage={ showErrorMessage }
            />
            <Card { ...cardState } togglePreview={ togglePreview } />

          </div>
        </div>
      </div>

      {cardState.cardList.length > 0 ? (
        <div ref={ savedCardSectionRef } className="container_saved_card">

          <h2 className="card_saved_title_section">Todo o Baralho</h2>
          <div className="playing_cards">
            {cardState.cardList.map((card, i) => (
              <Card key={ i } { ...card } />
            ))}
          </div>

        </div>
      ) : null}
      <div className="nav_game">
        <button type="button" onClick={ scrollToSavedCardSection }>Ver Baralho</button>
      </div>
    </div>
  );
};

export default App;
