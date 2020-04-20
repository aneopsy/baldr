import { SET_ACTIVE_CONTRACT, ADD_CONTRACT, DEL_CONTRACT } from '../actions';
import * as contractLogic from '../../scripts/contractLogic';

type Props = {
  type: string;
  payload: IContracts;
};

const INITIAL_STATE: IContracts = {
  selected: contractLogic.getInitialContract(),
  contracts: contractLogic.getContractList()
};

export default (state = INITIAL_STATE, { type, payload }: Props) => {
  switch (type) {
    case SET_ACTIVE_CONTRACT:
      return { ...state, selected: payload.selected };
    case DEL_CONTRACT:
    case ADD_CONTRACT:
      return { ...state, contracts: payload.contracts };
    default:
      return state;
  }
};
