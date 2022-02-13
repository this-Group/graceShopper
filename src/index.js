import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {App} from './components/index';

// console.log(document.getElementById('root'))

ReactDOM.render(
  // <BrowserRouter>
  // <h1>Testing 2</h1>
  <App />,
  // </BrowserRouter>,
  document.getElementById('root')
);