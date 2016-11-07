import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MovieController from './MovieController';

//css files
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

MovieController.search("titanic");

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);