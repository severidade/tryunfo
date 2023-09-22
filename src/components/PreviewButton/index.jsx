import React from 'react';
import PropTypes from 'prop-types';
import styles from './PreviewButton.module.css';

function PreviewButton({ togglePreview, isFromForm }) {
  const buttonText = isFromForm ? 'Pré-visualizar' : 'Voltar a edição';

  return (
    // <div className={ `flip_card ${isPreviewFlipped ? 'flipped' : ''}` }></div>
    <button
      className={ `${styles.preview} ${isFromForm ? styles.card : ''}` }
      onClick={ togglePreview }
      type="button"
    >
      {buttonText}
    </button>
  );
}

PreviewButton.propTypes = {
  togglePreview: PropTypes.func.isRequired,
  isFromForm: PropTypes.bool.isRequired, // Nova prop para identificar a origem
};

export default PreviewButton;
