import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import styles from './PreviewButton.module.css';

function PreviewButton({ togglePreview, isFromForm, isFromCard }) {
  const buttonText = isFromForm ? 'Pré-visualizar' : 'Voltar a edição';

  const trackButtonClick = () => {
    ReactGA.event({
      category: 'Botão de Pré-visualização',
      action: 'Clique no botão',
    });

    togglePreview();
  };

  return (
    <button
      className={ `
        flip_button

        ${isFromForm ? styles.preview_card : ''} 
        ${isFromCard ? styles.edit_card : ''}
      ` }
      onClick={ trackButtonClick }
      type="button"
    >
      <p>
        {buttonText}
        {' '}
      </p>
    </button>
  );
}

PreviewButton.propTypes = {
  togglePreview: PropTypes.func.isRequired,
  isFromForm: PropTypes.bool,
  isFromCard: PropTypes.bool,
};

PreviewButton.defaultProps = {
  isFromForm: false,
  isFromCard: false,
};
export default PreviewButton;
