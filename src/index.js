import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA4 from 'react-ga4'; 
import './index.css';
import App from './App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './stylesMaterialUi/Theme';

// ReactGA4.initialize('G-RZ8L31ERFQ');

const TRACKING_ID = 'G-RZ8L31ERFQ'
 
useEffect(() => {
  ReactGA4.initialize(TRACKING_ID); // Inicialize o React-GA4
  ReactGA4.pageview(window.location.pathname); // Rastreie a visualização da página inicial
}, []);


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
