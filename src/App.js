/* eslint-disable max-lines */
/* eslint-disable max-len */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; /* para gerar o id */
import ReactGA from 'react-ga';

import Form from './components/Form/index';
import Card from './components/Card/index';
import validateForm from './utils/validation';
import handleDeleteCard from './utils/handleDeleteCard';
import aboutPlayingCardsMsg from './utils/aboutPlayingCardsMsg';
import './App.css';
import EmptyDeckMsg from './components/EmptyDeckMsg';
import Menu from './components/Menu';
import SuperLogo from './components/SuperLogo';

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
  const TRACKING_ID = 'G-C7GHS0SW23';

  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const [cardState, setCardState] = useState(initialState);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [hasTrunfo, setHasTrunfo] = useState(false);

  const [isPreviewFlipped, setIsPreviewFlipped] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [selectedValue, setSelectedValue] = useState('todas');

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

    // Agora, filtre a lista de cartas com base em selectedValue e atualize searchResults
    const filteredResults = updatedCardState.cardList.filter((card) => selectedValue === 'todas' || card.cardRare === selectedValue);
    setSearchResults(filteredResults);
  }, [cardState, hasTrunfo, selectedValue]);

  const togglePreview = () => {
    setIsPreviewFlipped((prevIsFlipped) => !prevIsFlipped);
  };

  const toggleMenuActive = () => {
    setIsMenuActive(((prevIsActive) => !prevIsActive));
  };

  const toggleSearchActive = () => {
    setIsSearchActive(((prevIsSearchActive) => !prevIsSearchActive));
    toggleMenuActive();
  };

  const handleSearchClose = () => {
    toggleSearchActive();
    toggleMenuActive();
  };

  const handleDeleteCardWrapper = (cardId) => {
    handleDeleteCard(cardId, cardState, setCardState, setHasTrunfo, searchResults, setSearchResults);
  };

  const onInputSearch = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleSearch = () => {
    const filteredResults = cardState.cardList.filter((card) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      selectedValue === 'todas' || card.cardRare === selectedValue);
    console.log(selectedValue);
    setSearchResults(filteredResults);
    handleSearchClose();
  };

  return (
    <div className="container_app">
      {/* <h1 className="logo">
        <strong className="super">Super</strong>
        <strong className="trunfo">Trunfo</strong>
      </h1> */}

      <SuperLogo />
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
          <div className="deck_header">
            <h2 className="card_saved_title_section">Baralho</h2>
            <p className="about_playing_cards">
              {aboutPlayingCardsMsg(selectedValue, cardState.cardList)}
            </p>
          </div>
          <div className="playing_cards">
            {(selectedValue === 'todas' ? cardState.cardList : searchResults).map((card) => (
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
      <EmptyDeckMsg cardList={ cardState.cardList } />
      <Menu
        cardList={ cardState.cardList }
        toggleMenuActive={ toggleMenuActive }
        toggleSearchActive={ toggleSearchActive }
        isMenuActive={ isMenuActive }
        isSearchActive={ isSearchActive }
        handleSearch={ handleSearch }
        onInputSearch={ onInputSearch }
        selectedValue={ selectedValue }
      />
    </div>
  );
};

export default App;
