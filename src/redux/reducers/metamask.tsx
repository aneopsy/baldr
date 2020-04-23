import { SET_METAMASK_ADDRESS, SET_METAMASK_NETWORK, UNLOCK_METAMASK } from '../actions';

type Props = {
  type: string;
  payload: any;
};

export interface IMetamask {
  address: string;
  network: string;
  unlock: boolean;
}

const INITIAL_STATE: IMetamask = {
  address: '',
  network: '',
  unlock: false
};

export default (state = INITIAL_STATE, { type, payload }: Props) => {
  switch (type) {
    case SET_METAMASK_ADDRESS:
      return { ...state, address: payload.address };
    case SET_METAMASK_NETWORK:
      return { ...state, network: payload.network };
    case UNLOCK_METAMASK:
      return { ...state, unlock: true };
    default:
      return state;
  }
};
