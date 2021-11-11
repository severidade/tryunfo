import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <form className="">
        <label htmlFor="name">
          Nome
          <input type="text" id="name" />
        </label>
        <label htmlFor="description">
          <textarea id="description" data-testid="description-input" />
        </label>
      </form>
    );
  }
}

export default Form;
