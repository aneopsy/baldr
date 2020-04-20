import * as nodeLogic from '../../scripts/nodeLogic';
import { SET_ACTIVE_NETWORK } from '../actions';

type Props = {
  type: string;
  payload: INetworks;
};

const INITIAL_STATE: INetworks = {
  selected: nodeLogic.getInitialNode(nodeLogic.getNetworkList()),
  networks: nodeLogic.getNetworkList()
};

export default (state = INITIAL_STATE, { type, payload }: Props) => {
  switch (type) {
    case SET_ACTIVE_NETWORK:
      console.log(payload.selected);
      return { ...state, selected: payload.selected };
    default:
      return state;
  }
};
