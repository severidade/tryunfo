/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './card.module.css';
import PreviewButton from '../PreviewButton';

function Card(props) {
  const {
    id,
    cardName,
    cardImage,
    cardTrunfo,
    cardDescription,
    cardAttr1,
    cardAttr2,
    cardAttr3,
    cardRare,
    togglePreview,
    hasDeletButton,
    onDeleteClick,
  } = props;

  const MAX_ATTR_VALUE = 90;

  const calculateProgressBarWidth = (attrValue) => {
    const maxWidth = 100;
    return `${(attrValue / MAX_ATTR_VALUE) * maxWidth}%`;
  };

  const handleDeleteClick = () => {
    onDeleteClick(id);
  };

  return (
    <div className="card_back">
      <div className={ styles.card }>
        <div className={ styles.header_card_back }>
          { !hasDeletButton ? (
            <PreviewButton togglePreview={ togglePreview } isFromCard />
          ) : (
            <button
              type="button"
              className={ styles.remove_card }
              onClick={ handleDeleteClick }
              aria-label="Excluir Cartão"
            />
          )}
        </div>
        <figure className={ styles.card_image_container }>
          <img src={ cardImage } alt={ cardName } data-testid="image-card" />
          {cardTrunfo ? (
            <div data-testid="trunfo-card" className={ styles.super_seal }>
              Super Trunfo
            </div>
          ) : ''}
        </figure>
        <h3 data-testid="name-card" className={ styles.name_card }>{ cardName }</h3>
        <div className={ styles.rarity } data-testid="rare-card">
          <strong>
            {cardRare}
          </strong>
        </div>
        <div
          className={ styles.description_card }
          data-testid="description-card"
        >
          {cardDescription}
        </div>

        <div className={ styles.powers_container }>
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
  hasDeletButton: PropTypes.bool.isRequired,
  togglePreview: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired, // ID da carta
  onDeleteClick: PropTypes.func.isRequired, // Função de exclusão
};

export default Card;
