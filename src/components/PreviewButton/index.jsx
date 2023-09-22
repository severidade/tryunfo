import React from 'react';
import PropTypes from 'prop-types';
import styles from './PreviewButton.module.css';

function PreviewButton({ togglePreview }) {
  return (
    <button className={ styles.preview } onClick={ togglePreview } type="button">
      Ver carta
    </button>
  );
}

PreviewButton.propTypes = {
  togglePreview: PropTypes.func.isRequired,
};

export default PreviewButton;
