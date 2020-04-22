import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import store, { history } from '../redux/store';
import AppLayout from './app';

const Home = React.lazy(() => import('../screens/home'));
const Deploy = React.lazy(() => import('../screens/deploy'));
const Transaction = React.lazy(() => import('../screens/transaction'));

const publicPaths = [
  { exact: true, path: '/', component: Home },
  { exact: true, path: '/deploy', component: Deploy },
  { exact: true, path: '/tx', component: Transaction }
];

const publicRoutes = publicPaths.map(({ path, ...props }) => (
  <Route key={path} path={path} {...props} />
));

export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppLayout>
        <Switch>
          <Suspense fallback={<div />}>{publicRoutes}</Suspense>
        </Switch>
      </AppLayout>
    </ConnectedRouter>
  </Provider>
);
