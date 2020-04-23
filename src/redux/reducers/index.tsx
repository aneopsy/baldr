import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import network from './network';
import contract from './contract';
import metamask from './metamask';

export default (history: History) =>
  combineReducers<IReducerStates>({
    network,
    contract,
    metamask,
    router: connectRouter(history)
  });
