import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

it('should take a snapshot', () => {
  const { asFragment } = render(
    <Router history={history}>
      <App /> 
    </Router>
  );

  expect(asFragment(<App />)).toMatchSnapshot()
});
