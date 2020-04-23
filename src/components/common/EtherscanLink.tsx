import React from 'react';
import { getTxHashUrl, getAddressUrl, getRootUrl } from '../../scripts/etherscan';

type Props = {
  networkId: string;
  txHash: string;
  address: string;
  children: any;
};

const EtherscanLink: React.FC<Props> = props => {
  const url = props.txHash
    ? getTxHashUrl(props.networkId, props.txHash)
    : props.address
    ? getAddressUrl(props.networkId, props.address)
    : getRootUrl(props.networkId);

  const text = props.txHash || props.txHash || props.address || url;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {props.children || text}
    </a>
  );
};

export default EtherscanLink;
