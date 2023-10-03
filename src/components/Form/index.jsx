/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import styles from './form.module.css';
import PreviewButton from '../PreviewButton';
import NumberInput from '../NumberInput';
import CustomTextField from '../../stylesMaterialUi/CustomTextField';
import CustomCtaButton from '../../stylesMaterialUi/CustomCtaButton';
import CustomSelect from '../../stylesMaterialUi/CustomSelect';

function Form(props) {
  const {
    cardName,
    cardDescription,
    cardAttr1,
    cardAttr2,
    cardAttr3,
    cardImage,
    cardRare,
    cardTrunfo,
    hasTrunfo,
    onInputChange,
    isSaveButtonDisabled,
    remainingPower,
    onSaveButtonClick,
    togglePreview,
    showErrorMessage,
  } = props;

  // const [value, setValue] = useState(0);

  const handleInputFocus = (event) => {
    event.target.value = '';
  };

  return (
    <div className={ styles.card_front }>
      <div className={ styles.header_card_front }>
        <h2 className={ styles.heder_card_title }>Nova Carta </h2>
        <PreviewButton togglePreview={ togglePreview } isFromForm />
      </div>
      <form className={ styles.form_new_card }>
        <CustomTextField
          id="standard-basic"
          name="cardName"
          data-testid="name-input"
          label="Nome"
          value={ cardName }
          onChange={ onInputChange }
          variant="standard"
          fullWidth
        />
        <CustomTextField
          id="standard-textarea"
          label="Descrição"
          name="cardDescription"
          data-testid="description-input"
          rows={ 1 }
          multiline
          variant="standard"
          value={ cardDescription }
          onChange={ onInputChange }
          fullWidth
        />

        <div className={ styles.container_power }>
          <h3 className={ styles.power_title }>
            Poder
          </h3>
          <NumberInput
            className={ styles.attr1 }
            attribute="attr1"
            name="cardAttr1"
            label="Força"
            value={ cardAttr1.toString() }
            focus={ handleInputFocus }
            change={ onInputChange }
          />
          <NumberInput
            className={ styles.attr2 }
            attribute="attr2"
            name="cardAttr2"
            label="Defesa"
            value={ cardAttr2.toString() }
            focus={ handleInputFocus }
            change={ onInputChange }
          />

          <NumberInput
            className={ styles.attr3 }
            attribute="attr3"
            name="cardAttr3"
            label="Energia"
            value={ cardAttr3.toString() }
            focus={ handleInputFocus }
            change={ onInputChange }
          />
          <div className={ styles.remaining_power }>
            {showErrorMessage ? 'A soma de poderes é de no máximo 210' : (
              <>
                Poder restante
                {' '}
                <strong
                  className={ styles.remaining_power_value }
                >
                  {remainingPower}

                </strong>
              </>
            )}
          </div>
        </div>

        <CustomTextField
          id="standard-textarea"
          label="Imagem"
          name="cardImage"
          data-testid="description-input"
          variant="standard"
          value={ cardImage }
          onChange={ onInputChange }
          fullWidth
        />

        <div className={ styles.footer_form_card }>
          <FormControl variant="standard" className={ styles.rare_input }>
            <CustomSelect
              labelId="rare-input-label"
              id="rare-input"
              name="cardRare" // Nome do campo que será enviado ao `onInputChange`
              data-testid="rare-input"
              value={ cardRare }
              onChange={ onInputChange }
            >
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="raro">Raro</MenuItem>
              <MenuItem value="muito raro">Muito Raro</MenuItem>
            </CustomSelect>
          </FormControl>
          <label
            htmlFor="trunfo-input"
            className={
              `
                ${styles.super_trunfo} 
                ${hasTrunfo ? styles.labelDisabled : ''}
              `
            }
          >
            SuperTrunfo
            {' '}
            <input
              id="trunfo-input"
              type="checkbox"
              name="cardTrunfo"
              data-testid="trunfo-input"
              checked={ cardTrunfo }
              onChange={ onInputChange }
              disabled={ hasTrunfo }
            />
          </label>
        </div>
        <div className={ styles.has_trunfo_msg }>
          { hasTrunfo ? 'Já existe um Super Trunfo no baralho' : ''}
        </div>
        <CustomCtaButton
          color="primary"
          variant="contained"
          type="submit"
          data-testid="save-button"
          onClick={ onSaveButtonClick }
          disabled={ isSaveButtonDisabled }
        >
          Salvar
        </CustomCtaButton>
      </form>
    </div>
  );
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  remainingPower: PropTypes.number.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  showErrorMessage: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  togglePreview: PropTypes.func.isRequired,
};

export default Form;
