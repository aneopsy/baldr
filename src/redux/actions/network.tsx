import { Dispatch } from 'redux';
import * as nodeLogic from '../../scripts/nodeLogic';

export const SET_ACTIVE_NETWORK: 'SET_ACTIVE_NETWORK' = 'SET_ACTIVE_NETWORK';
export const GET_NETWORK: 'GET_NETWORK' = 'GET_NETWORK';
export const ADD_NETWORK: 'ADD_NETWORK' = 'ADD_NETWORK';
export const DEL_NETWORK: 'DEL_NETWORK' = 'DEL_NETWORK';

export type getNetworkDispatcher = () => (dispatch: Dispatch) => Promise<void>;
export type setNetworkDispatcher = (network: INetwork) => (dispatch: Dispatch) => Promise<void>;
export type setActiveNetworkDispatcher = (selected: INode) => (dispatch: Dispatch) => Promise<void>;

// export const getNetwork: getNetworkDispatcher = () => async dispatch =>
//   new Promise(
//     (resolve, reject): void => {
//       dispatch({
//         type: GET_NETWORK,
//         payload: { resolve, reject }
//       });
//     }
//   );

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

// export const setNetwork: setNetworkDispatcher = (network: INetwork) => async dispatch =>
//   new Promise(
//     (resolve, reject): void => {
//       dispatch({
//         type: GET_NETWORK,
//         payload: { network, resolve, reject }
//       });
//     }
//   );

// export const getNetwork: Dispatcher = () => async dispatch =>
//   new Promise(
//     (resolve, reject): void => {
//       dispatch({
//         type: GET_NETWORK,
//         payload: { resolve, reject }
//       });
//     }
//   );
