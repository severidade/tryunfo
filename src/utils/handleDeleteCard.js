// eslint-disable-next-line max-params
export default function handleDeleteCard(
  cardId,
  cardState,
  setCardState,
  setHasTrunfo,
  searchResults,
  setSearchResults,
) {
  const updatedCardList = cardState.cardList.filter((card) => card.id !== cardId);

  // Verifica se o card excluído é um "Supertrunfo"
  const deletedCard = cardState.cardList.find((card) => card.id === cardId);
  if (deletedCard && deletedCard.cardTrunfo) {
    // Se for um "Supertrunfo", define hasTrunfo como false
    setHasTrunfo(false);
  }

  const updatedCardState = {
    ...cardState,
    cardList: updatedCardList,
  };

  setCardState(updatedCardState);

  // Verifica se searchResults é uma matriz antes de filtrá-la
  if (Array.isArray(searchResults)) {
    const updatedSearchResults = searchResults.filter((card) => card.id !== cardId);
    setSearchResults(updatedSearchResults);
  }
}
