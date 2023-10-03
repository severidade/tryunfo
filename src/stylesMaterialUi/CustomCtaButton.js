import React from 'react';
import Button from '@mui/material/Button';

const roundedButtonStyle = {
  borderRadius: '10px',
};

const CustomCtaButton = (props) => (
  <Button
    { ...props }
    style={ roundedButtonStyle }
  />
);

export default CustomCtaButton;
