import React from 'react';
import styles from './SuperLogo.module.css';

function SuperLogo() {
  return (
    <h1 className={ styles.logo }>
      <strong className={ styles.super }>Super</strong>
      <strong className={ styles.trunfo }>Trunfo</strong>
    </h1>
  );
}

export default SuperLogo;
