import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const {
      cardName,
      cardImage,
      cardTrunfo,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
    } = this.props;

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
            <p data-testid="attr1-card">
              Attr01
              <strong>
                {cardAttr1}
              </strong>
            </p>
            <p data-testid="attr2-card">
              Attr02
              <strong>
                {cardAttr2}
              </strong>
            </p>
            <p data-testid="attr3-card">
              Attr03
              <strong>
                {cardAttr3}
              </strong>
            </p>
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
