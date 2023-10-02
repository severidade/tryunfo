import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DAA520',
    },
  },
  typography: {
    fontFamily: ['Titillium Web', 'Roboto', 'sans-serif'].join(','),
  },
});

export default theme;
