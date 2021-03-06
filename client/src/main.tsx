import React from 'react';
import ReactDOM from 'react-dom';
import Context from './store/Store';
import App from './App';
import './styles/global.css';

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>,
  document.getElementById('root')
);
