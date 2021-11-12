import React from 'react';
import Form from './components/Form';
import './App.css';

class App extends React.Component {
  render() {
    // const { cardName } = this.state;
    return (
      <div>
        <h1>Tryunfs</h1>
        <div id="conteiner_NewCard">
          <Form />
        </div>
      </div>
    );
  }
}

export default App;
