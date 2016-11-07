import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//css files
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import MovieController from './MovieController';
MovieController.search("Interstellar");

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );