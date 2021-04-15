import Main from './pages/Main';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// STORE
import store from './store';

// GLOBAL STYLES
import GlobalStyle from './styles/Global';

render(
  <>
    <Provider store={store}>
      <GlobalStyle />
      <Main />
    </Provider>
  </>,
  document.getElementById('root')
);
