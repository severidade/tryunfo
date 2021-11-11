import React from 'react'

class Componente extends React.Component {
  constructor() {
    super();
    this.state = {
      isActiveButton: false,
    };
  }

  render() {
    const { isActiveButton } = this.state;
    return (
      <div>
        <button onClick={() => this.setState({ isActiveButton: true })}>Clique em mim!</button>
        {
          isActiveButton ? <p>Está ativo!</p> : <p>Não está ativo!</p>
        }
      </div>
    )
  }
}

export default Componente;
