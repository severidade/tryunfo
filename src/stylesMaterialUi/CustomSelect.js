import React from 'react';
import Select from '@mui/material/Select';

const select = {
  textTransform: 'uppercase',
  fontSize: '14px',
  fontWeight: '400',
  color: 'var(----primary-color-extra-dark)',
  // backgroundColor: 'lime',
  width: '100%',
};

const CustomSelect = (props) => (
  <Select
    { ...props }
    style={ select }
  />
);

export default CustomSelect;
