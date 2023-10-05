import React, { useState, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid'; /* para gerar o id */
import Form from './components/Form/index';
import Card from './components/Card/index';
import validateForm from './utils/validation';
import handleDeleteCard from './utils/handleDeleteCard';
import './App.css';
import EmptyDeckMsg from './components/EmptyDeckMsg';

const initialState = {
  id: '44',
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
  hasDeletButton: false,
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

    const cardId = uuidv4();

    // verifica se já existe um trunfo definido
    // percorre cardList e ver se term um verdadeiro
    const existingTrunfo = cardState.cardList.find((card) => card.cardTrunfo);

    // verifica se a nova carta deve ser marcada como trunfo
    const isTrunfo = !existingTrunfo && cardState.cardTrunfo;

    const newCard = {
      ...cardState,
      id: cardId, // Adicione o ID à carta
      cardTrunfo: isTrunfo,
    };

    const updatedCardState = {
      ...initialState,
      cardList: [newCard, ...cardState.cardList],
      // cardTrunfo: cardState.cardTrunfo,
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

  const handleDeleteCardWrapper = (cardId) => {
    handleDeleteCard(cardId, cardState, setCardState, setHasTrunfo, hasTrunfo);
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
              hasTrunfo={ hasTrunfo }
            />
            <Card
              { ...cardState }
              togglePreview={ togglePreview }
              onDeleteClick={ handleDeleteCard }
            />

          </div>
        </div>
      </div>

      {cardState.cardList.length > 0 ? (
        <div ref={ savedCardSectionRef } className="container_saved_card">

          <h2 className="card_saved_title_section">Todo o Baralho</h2>
          <div className="playing_cards">
            {cardState.cardList.map((card) => (
              <Card
                key={ card.id }
                { ...card }
                togglePreview={ togglePreview }
                onDeleteClick={ handleDeleteCardWrapper }
                hasDeletButton
              />
            ))}
          </div>

        </div>
      ) : null}
      {/* <div className="nav_game">Você está sem cartas no baralho! Para jogar, por favor, preencha o formulário acima.</div> */}
      {/* <div className="nav_game">
        <p> seu baralho esta vazio adicione cartas ao baralho</p>

        <button
          type="button"
          onClick={ scrollToSavedCardSection }
          disabled={ cardState.cardList.length === 0 }
        >
          {cardState.cardList.length > 0 ? 'Ver Baralho' : 'Não há cartas'}
        </button>
        <button type="button">Pesquisar</button>
      </div> */}
      {/* <div className="empty_deck_msg">
        <p>O Baralho esta vazio. Adicione cartas!</p>
      </div> */}
      <EmptyDeckMsg cardList={ cardState.cardList } />
    </div>
  );
};

export default App;
