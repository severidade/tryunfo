import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,

      isSaveButtonDisabled: true,
    };
    this.onInputChange = this.onInputChange.bind(this);
    // this.onInputChange = this.isSaveButtonDisabled.bind(this);
    // é o que faz visivel o estado inicial nos componentes quando a funcao for chamada
  }

  onInputChange({ target }) {
    const { name } = target;
    // identifica mudanca no campo do formulário tendo como alvo a propriedade name
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    // operador ternario: se for checkbox usa no target caso contrario usa a propriedade name

    // this.setState faz com que a função pegue de forma genérica todos os campos "name" do formulário e atualiza o estado
    // depois tem a validacao
    this.setState({ [name]: value }, () => {
      const {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
      } = this.state;

      const stringValues = [cardName, cardDescription, cardImage];
      const stringItem = stringValues.some((string) => string.length === 0);

      const maxValue = 90;
      const maxTotalValue = 210;
      const numValues = [cardAttr1, cardAttr2, cardAttr3];
      const numItem = numValues.some((num) => num < 0 || num > maxValue || num === '');
      const sumValues = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);

      if (stringItem === true || numItem === true) {
        this.setState({ isSaveButtonDisabled: true });
      } else if (sumValues > maxTotalValue) {
        this.setState({ isSaveButtonDisabled: true });
      } else {
        this.setState({ isSaveButtonDisabled: false });
      }
    });
  }

  onSaveButtonClick = (event) => {
    event.preventDefault();
    this.onVerifyTrunfo();
    this.setState(() => ({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    }));
  }

  render() {
    const {
      state: {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo,
        isSaveButtonDisabled,
      }, onInputChange,
    } = this;
    return (
      <div>
        <h1>Tryunfs</h1>
        <div className="conteiner_NewCard">
          <Form
            onInputChange={ onInputChange }
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            isSaveButtonDisabled={ isSaveButtonDisabled }
          />
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
          />
        </div>
      </div>
    );
  }
}

export default App;
