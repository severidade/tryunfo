import React from 'react';
import PropTypes from 'prop-types';
import styles from './PreviewButton.module.css';

function PreviewButton({ togglePreview, isFromForm, isFromCard }) {
  const buttonText = isFromForm ? 'Pré-visualizar' : 'Voltar a edição';

  return (
    <button
      className={ `
        flip_button

        ${isFromForm ? styles.preview_card : ''} 
        ${isFromCard ? styles.edit_card : ''}
      ` }
      onClick={ togglePreview }
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
  isFromForm: PropTypes.bool.isRequired,
  isFromCard: PropTypes.bool.isRequired,
};

export default PreviewButton;
