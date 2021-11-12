import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './App.css';

class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     cardName: ''
  //   };
  //   this.onInputChange = this.onInputChange.bind(this);
  //   // é o que faz visivel o estado inicial nos componentes quando a funcao for chamada
  // }

  // onInputChange({target}) {
  //   const { name } = target;
  //   // name é a propriedade dos elementos no formulario
  // }

  render() {
    return (
      <div>
        <h1>Tryunfs</h1>
        <div className="conteiner_NewCard">
          <Form />
          <Card />
          {/* <Form cardName={ cardName } />
          <Card cardName={ cardName } /> */}
        </div>
      </div>
    );
  }
}

export default App;
