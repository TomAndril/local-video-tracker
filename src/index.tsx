import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// ROUTING
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from './routes';
import store from './store';

// GLOBAL STYLES
import GlobalStyle from './styles/Global';

render(
  <>
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <Switch>
          {routes.map((elem) => (
            <Route
              path={elem.path}
              component={elem.component}
              key={elem.path}
            />
          ))}
        </Switch>
      </Router>
    </Provider>
  </>,
  document.getElementById('root')
);
