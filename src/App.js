/* eslint-disable max-len */
import React, { useState, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid'; /* para gerar o id */
import Form from './components/Form/index';
import Card from './components/Card/index';
import validateForm from './utils/validation';
import handleDeleteCard from './utils/handleDeleteCard';
import './App.css';
import EmptyDeckMsg from './components/EmptyDeckMsg';
import Menu from './components/Menu';

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
  }, [cardState, hasTrunfo]);

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

  // eslint-disable-next-line no-shadow
  const aboutPlayingCardsMsg = (selectedValue, cardList) => {
    const cardCountByType = cardList.reduce((count, card) => {
      const rarity = card.cardRare;
      if (!count[rarity]) {
        count[rarity] = 0;
      }
      // eslint-disable-next-line no-plusplus
      count[rarity]++;
      return count;
    }, {});

    switch (selectedValue) {
    case 'todas':
      return `Abaixo estão todas as cartas do baralho (${cardList.length} cartas no total)`;
    case 'normal':
      return `Abaixo estão todas as cartas NORMAIS do baralho (${cardCountByType.normal || 0} cartas)`;
    case 'raro':
      return `Abaixo estão todas as cartas RARAS do baralho (${cardCountByType.raro || 0} cartas)`;
    case 'muito_raro':
      return `Abaixo estão todas as cartas MUITO RARAS do baralho (${cardCountByType.muito_raro || 0} cartas)`;
    default:
      return 'Mensagem padrão ou mensagem de erro aqui';
    }
  };

  return (
    <div className="container_app">
      <h1 className="logo">
        <strong className="super">Super</strong>
        <strong className="trunfo">Trunfo</strong>
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
