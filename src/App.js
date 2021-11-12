import React from 'react';
import Form from './components/Form';
import './App.css';
// import Card from './components/Card.';

class App extends React.Component {
  render() {
    // const { cardName } = this.state;
    return (
      <div>
        <h1>Tryunfs</h1>
        <div className="conteiner_NewCard">
          <Form />
          {/* <Card /> */}
        </div>
      </div>
    );
  }
}

export default App;
