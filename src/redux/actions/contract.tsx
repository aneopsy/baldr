import { Dispatch } from 'redux';
import store from '../store';
import * as contractLogic from '../../scripts/contractLogic';

export const SET_ACTIVE_CONTRACT: 'SET_ACTIVE_CONTRACT' = 'SET_ACTIVE_CONTRACT';
export const ADD_CONTRACT: 'ADD_CONTRACT' = 'ADD_CONTRACT';
export const DEL_CONTRACT: 'DEL_CONTRACT' = 'DEL_CONTRACT';

export type setActiveContractDispatcher = (
  selected: IContract | undefined
) => (dispatch: Dispatch) => Promise<void>;
export type addContractDispatcher = (contract: IContract) => (dispatch: Dispatch) => Promise<void>;

export const setActiveContract: setActiveContractDispatcher = (
  selected: IContract | undefined
) => async dispatch =>
  new Promise(
    (resolve, reject): void => {
      contractLogic.saveActiveContract(selected);
      dispatch({
        type: SET_ACTIVE_CONTRACT,
        payload: { selected, resolve, reject }
      });
    }
  );

export const addContract: addContractDispatcher = (contract: any) => async dispatch =>
  new Promise(
    (resolve, reject): void => {
      const contractList = store.getState().contract.contracts;
      const contracts = contractLogic.addContract(contractList, contract);
      dispatch({
        type: ADD_CONTRACT,
        payload: { contracts, resolve, reject }
      });
    }
  );

export const delContract: addContractDispatcher = (contract: any) => async dispatch =>
  new Promise(
    (resolve, reject): void => {
      const contractList = store.getState().contract.contracts;
      const contracts = contractLogic.deleteContract(contractList, contract);
      dispatch({
        type: DEL_CONTRACT,
        payload: { contracts, resolve, reject }
      });
    }
  );
