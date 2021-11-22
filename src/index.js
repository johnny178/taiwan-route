import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ResetStyle, GlobalStyles } from './global-styles';

ReactDOM.render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
