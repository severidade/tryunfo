import React from 'react';
import PropTypes from 'prop-types';

function NumberInput(props) {
  const { attribute, name, value, focus, change } = props;

  return (
    <label htmlFor={ `${attribute}-input` }>
      Força
      <button type="button" className="decrement_btn">-</button>
      <input
        id={ `${attribute}-input` }
        type="number"
        name={ name }
        value={ value } // O valor é uma string
        data-testid={ `${attribute}-input` }
        onChange={ change }
        min="0"
        max="90"
        onFocus={ focus }
      />
      <button type="button" className="increment_btn">+</button>
    </label>
  );
}

NumberInput.propTypes = {
  attribute: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  focus: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
};

export default NumberInput;
