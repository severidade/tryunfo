import React from 'react';
import PropTypes from 'prop-types';

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
          <div className="power" data-testid="attr1-card">
            <div className="power_attr">
              Attr01
            </div>
            <div className="power_value">
              {cardAttr1}
            </div>
          </div>
          <div className="power" data-testid="attr2-card">
            <div className="power_attr">
              Attr02
            </div>
            <div className="power_value">
              {cardAttr2}
            </div>
          </div>
          <div className="power" data-testid="attr3-card">
            <div className="power_attr">
              Attr03
            </div>
            <div className="power_value">
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
