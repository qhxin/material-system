import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Root from './components/Root';
import IndexPage from './routes/IndexPage';
import LoginPage from './routes/LoginPage';

function RouterConfig({ history }) {
  return (
    <Root>
      <Router history={history}>
        <Switch>
          <Route path="/login" exact component={LoginPage} />
          <Route path="/" exact component={IndexPage} />
        </Switch>
      </Router>
    </Root>
  );
}

export default RouterConfig;
