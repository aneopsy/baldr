import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import store, { history } from '../redux/store';
import AppLayout from '../layout/app';

const Home = React.lazy(() => import('../screens/home'));

const publicPaths = [{ exact: true, path: '/', component: Home }];

const publicRoutes = publicPaths.map(({ path, ...props }) => (
  <Route key={path} path={path} {...props} />
));

export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <AppLayout>
          <Suspense fallback={<div />}>{publicRoutes}</Suspense>
        </AppLayout>
      </Switch>
    </ConnectedRouter>
  </Provider>
);
