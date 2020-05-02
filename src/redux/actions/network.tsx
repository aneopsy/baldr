import { Dispatch } from 'redux';
import store from '../store';
import * as nodeLogic from '../../scripts/nodeLogic';

export const SET_ACTIVE_NETWORK: 'SET_ACTIVE_NETWORK' = 'SET_ACTIVE_NETWORK';
export const ADD_CUSTOM_NETWORK: 'ADD_CUSTOM_NETWORK' = 'ADD_CUSTOM_NETWORK';
export const DEL_CUSTOM_NETWORK: 'DEL_CUSTOM_NETWORK' = 'DEL_CUSTOM_NETWORK';

export type setActiveNetworkDispatcher = (selected: INode) => (dispatch: Dispatch) => Promise<void>;

export const addCustomNetwork: setActiveNetworkDispatcher = (selected: INode) => async dispatch =>
  new Promise(
    (resolve, reject): void => {
      const networksList = store.getState().network.networks;
      nodeLogic.addCustomNode(networksList, selected);
      dispatch({
        type: ADD_CUSTOM_NETWORK,
        payload: { selected, resolve, reject }
      });
    }
  );

export const setActiveNetwork: setActiveNetworkDispatcher = (selected: INode) => async dispatch =>
  new Promise(
    (resolve, reject): void => {
      nodeLogic.saveActiveNode(selected);
      dispatch({
        type: SET_ACTIVE_NETWORK,
        payload: { selected, resolve, reject }
      });
    }
  );
