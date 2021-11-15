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

      cardlist: [],
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
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

  createNewCard = (newCard) => {
    this.setState((prevState) => (
      { cardlist: [...prevState.cardlist, newCard] }
    ));
  }

  // A resolucao dessa função foi possível apos estudar o codigo de Aparecida Goulart;
  onSaveButtonClick = (event) => {
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
      cardlist,
    } = this.state;

    this.createNewCard({
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      cardlist,
    });

    // limpar
    event.preventDefault();
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
        cardlist,
      }, onInputChange, onSaveButtonClick,
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
            onSaveButtonClick={ onSaveButtonClick }
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
        <div className="conteiner_SavedCard">
          <h2> Cartas Salvas </h2>
          {cardlist.map((card, i) => (<Card
            key={ i }
            cardName={ card.cardName }
            cardDescription={ card.cardDescription }
            cardAttr1={ card.cardAttr1 }
            cardAttr2={ card.cardAttr2 }
            cardAttr3={ card.cardAttr3 }
            cardImage={ card.cardImage }
            cardRare={ card.cardRare }
            cardTrunfo={ card.cardTrunfo }
          />))}
        </div>
      </div>
    );
  }
}

export default App;
