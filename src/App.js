import React from 'react';
import Form from './components/Form';
import './App.css';

class App extends React.Component {
  render() {
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
