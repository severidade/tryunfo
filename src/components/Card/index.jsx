/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './card.module.css';

function Card(props) {
  const {
    cardName,
    cardImage,
    cardTrunfo,
    cardDescription,
    cardAttr1,
    cardAttr2,
    cardAttr3,
    cardRare,
  } = props;

  const MAX_ATTR_VALUE = 90;

  const calculateProgressBarWidth = (attrValue) => {
    const maxWidth = 100;
    return `${(attrValue / MAX_ATTR_VALUE) * maxWidth}%`;
  };

  return (
    <div className="content_PreviewNewCard">
      {/* <h2>Pré-visualização</h2> */}
      <div className="PreviewNewCard">
        <h3 data-testid="name-card">{cardName}</h3>
        <figure>
          <img src={ cardImage } alt={ cardName } data-testid="image-card" />
          { cardTrunfo ? <div data-testid="trunfo-card">Super Trunfo</div> : '' }
          {/* operador ternario - se card trufo for (=== true ?) mostra super trunfo se nao um mostra nada */}
        </figure>
        <div
          className="description-card"
          data-testid="description-card"
        >
          {cardDescription}
        </div>

        <div className="powers-card">

          <div className={ styles.power } data-testid="attr1-card">
            <div className={ styles.power_attr }>
              Força
            </div>
            <div className={ styles.power_gauge }>
              <div
                className={ styles.power_gauge_pointer }
                style={ { width: calculateProgressBarWidth(cardAttr1) } }
              />
            </div>
            <div className={ styles.power_value }>
              {cardAttr1}
            </div>
          </div>

          <div className={ styles.power } data-testid="attr2-card">
            <div className={ styles.power_attr }>
              Defesa
            </div>
            <div className={ styles.power_gauge }>
              <div
                className={ styles.power_gauge_pointer }
                style={ { width: calculateProgressBarWidth(cardAttr2) } }
              />
            </div>
            <div className={ styles.power_value }>
              {cardAttr2}
            </div>
          </div>

          <div className={ styles.power } data-testid="attr3-card">
            <div className={ styles.power_attr }>
              Agilidade
            </div>
            <div className={ styles.power_gauge }>
              <div
                className={ styles.power_gauge_pointer }
                style={ { width: calculateProgressBarWidth(cardAttr3) } }
              />
            </div>
            <div className={ styles.power_value }>
              {cardAttr3}
            </div>
          </div>
          <p className="rare" data-testid="rare-card">
            <strong>
              {cardRare}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
};

export default Card;
