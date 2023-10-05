import React from 'react';
import PropTypes from 'prop-types';
import styles from './emptyDeckMsg.module.css';

function EmptyDeckMsg(props) {
  const { cardList } = props;
  const hasCard = cardList.length;

  return (
    <div className={ `${styles.empty_deck_msg} ${hasCard > 0 ? styles.escondido : ''}` }>
      <p>O Baralho esta vazio. Adicione cartas!</p>
    </div>
  );
}

EmptyDeckMsg.propTypes = {
  cardList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EmptyDeckMsg;
