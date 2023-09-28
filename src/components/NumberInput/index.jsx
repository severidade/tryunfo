import React from 'react';
import PropTypes from 'prop-types';
import styles from './number.module.css';

function NumberInput(props) {
  const { attribute, name, label, value, focus, change } = props;

  const MAX_ATTR_VALUE = 90;

  const decrementValue = () => {
    const numericValue = parseInt(value, 10);
    if (!Number.isNaN(numericValue) && numericValue > 0) {
      const newValue = (numericValue - 1).toString();
      change({ target: { name, value: newValue } });
    }
  };

  const incrementValue = () => {
    const numericValue = parseInt(value, 10);
    if (!Number.isNaN(numericValue) && numericValue < MAX_ATTR_VALUE) {
      const newValue = (numericValue + 1).toString();
      change({ target: { name, value: newValue } });
    }
  };

  return (
    <label
      htmlFor={ `${attribute}-input` }
      className={ styles.label_power }
    >
      <span className={ `${styles.label_power_title} ${styles[attribute]}` }>
        { label}
        {' '}
      </span>
      <button
        type="button"
        className={ styles.decrement_btn }
        onClick={ decrementValue }
      >
        -
      </button>

      <input
        id={ `${attribute}-input` }
        className={ styles.number_input }
        type="number"
        name={ name }
        value={ value } // O valor é uma string
        data-testid={ `${attribute}-input` }
        onChange={ change }
        min="0"
        max="90"
        onFocus={ focus }
      />
      <button
        type="button"
        className={ styles.increment_btn }
        onClick={ incrementValue }
      >
        +
      </button>
    </label>
  );
}

NumberInput.propTypes = {
  attribute: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  focus: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
};

export default NumberInput;
