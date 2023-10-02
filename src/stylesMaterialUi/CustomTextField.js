import React from 'react';
import TextField from '@mui/material/TextField';

const CustomTextField = (props) => (
  <TextField
    { ...props }
    InputLabelProps={ {
      style: {
        textTransform: 'uppercase',
        fontSize: '14px',
        fontWeight: '400',
        color: 'black',
      },
    } }
  />
);

export default CustomTextField;
