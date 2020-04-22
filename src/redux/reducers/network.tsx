import * as nodeLogic from '../../scripts/nodeLogic';
import { SET_ACTIVE_NETWORK } from '../actions';

type Props = {
  type: string;
  payload: INetworks;
};

const networkList = nodeLogic.getNetworkList();

const INITIAL_STATE: INetworks = {
  selected: nodeLogic.getInitialNode(networkList),
  networks: networkList
};

export default (state = INITIAL_STATE, { type, payload }: Props) => {
  switch (type) {
    case SET_ACTIVE_NETWORK:
      return { ...state, selected: payload.selected };
    default:
      return state;
  }
};
