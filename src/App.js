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

      isDisabled: true,
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

    this.setState({ [name]: value }, () => {
      const { cardName } = this.state;
      if(cardName === "") {
        this.setState({ isDisabled: true });
      } else {
        this.setState({ isDisabled: false });
      }
    });
    // this.setState faz com que a função pegue de forma genérica todos os campos "name" do formulário e atualiza o estado
    // depois tem a validacao
  }

  // criar a funcaoisSaveButtonDisabled

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
