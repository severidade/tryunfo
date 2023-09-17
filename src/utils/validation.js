// utils/validation.js

export default function validateForm(data) {
  const {
    cardName,
    cardDescription,
    cardAttr1,
    cardAttr2,
    cardAttr3,
  } = data;

  const stringValues = [cardName, cardDescription];
  const stringItem = stringValues.some((string) => string.length === 0);

  const maxValue = 90;
  const maxTotalValue = 210;
  const numValues = [cardAttr1, cardAttr2, cardAttr3];
  const numItem = numValues.some((num) => num < 0 || num > maxValue || num === '');
  const sumValues = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);

  if (stringItem === true || numItem === true || sumValues > maxTotalValue) {
    return false;
  }
  return true;
}
