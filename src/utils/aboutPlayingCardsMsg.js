/* eslint-disable max-len */
export default function aboutPlayingCardsMsg(selectedValue, cardList) {
  const cardCountByType = cardList.reduce((count, card) => {
    const rarity = card.cardRare;
    if (!count[rarity]) {
      count[rarity] = 0;
    }
    // eslint-disable-next-line no-plusplus
    count[rarity]++;
    return count;
  }, {});

  const numCartas = cardList.length;
  const numCartasNormal = cardCountByType.normal || 0;
  const numCartasRaro = cardCountByType.raro || 0;
  const numCartasMuitoRaro = cardCountByType.muito_raro || 0;
  const mensagemCartas = numCartas === 1 ? 'carta' : 'cartas';
  const mensagemCartasNormal = numCartasNormal === 1 ? 'carta' : 'cartas';
  const mensagemCartasRaro = numCartasRaro === 1 ? 'carta' : 'cartas';
  const mensagemCartasMuitoRaro = numCartasRaro === 1 ? 'carta' : 'cartas';

  switch (selectedValue) {
  case 'todas':
    return `Abaixo, você encontrará TODAS as cartas disponíveis. Atualmente, há um total de ${numCartas} ${mensagemCartas} no baralho.`;
  case 'normal':
    return `Abaixo estão todas as cartas NORMAIS do baralho (${numCartasNormal} ${mensagemCartasNormal} no total)`;
  case 'raro':
    return `Abaixo estão todas as cartas RARAS do baralho (${numCartasRaro} ${mensagemCartasRaro} no total)`;
  case 'muito_raro':
    return `Abaixo estão todas as cartas MUITO RARAS do baralho (${numCartasMuitoRaro} ${mensagemCartasMuitoRaro} no total)`;
  default:
    return 'Mensagem padrão ou mensagem de erro aqui';
  }
}
