export default function handleDeleteCard(
  cardId,
  cardState,
  setCardState,
  setHasTrunfo,
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
}
