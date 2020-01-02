import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';

import List from './List';
import NotFound from './NotFound';
import Single from './Single';

import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
  <div style={{ margin: '0 auto', maxWidth: '800px', padding: '0 1rem' }}>
    <Router>
      <List path="/" />
      <Single path="answers/:level" />
      <NotFound default />
    </Router>
  </div>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
