import { Dispatch, AnyAction } from 'redux';

export const SET_METAMASK_ADDRESS: 'SET_METAMASK_ADDRESS' = 'SET_METAMASK_ADDRESS';
export const SET_METAMASK_NETWORK: 'SET_METAMASK_NETWORK' = 'SET_METAMASK_NETWORK';
export const UNLOCK_METAMASK: 'UNLOCK_METAMASK' = 'UNLOCK_METAMASK';

export type setMetamaskAddressDispatcher = (
  address: string
) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
export type setMetamaskNetworkDispatcher = (
  network: string
) => (dispatch: Dispatch<AnyAction>) => Promise<void>;

export const setMetamaskAddress: setMetamaskAddressDispatcher = (
  address: string
) => async dispatch =>
  new Promise(
    (resolve, reject): void => {
      dispatch({
        type: SET_METAMASK_ADDRESS,
        payload: { address, resolve, reject }
      });
    }
  );

export const setMetamaskNetwork: setMetamaskNetworkDispatcher = (
  network: string
) => async dispatch =>
  new Promise(
    (resolve, reject): void => {
      dispatch({
        type: SET_METAMASK_NETWORK,
        payload: { network, resolve, reject }
      });
    }
  );
