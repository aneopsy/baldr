import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './layout/routes';
import './configs/i18n';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Routes />, document.getElementById('root'));

serviceWorker.unregister();
