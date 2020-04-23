import React, { useState } from 'react';
import TransactionDetails from '../common/TransactionDetails';
import ContractInput from '../common/ContractInput';
import { Button } from 'antd';
import { sign } from '../common/sign';
import { unhexTransaction, hexTransaction } from '../../scripts/utils';

type Props = {
  networkId: string;
};

const LoadTransactionView: React.FC<Props> = props => {
  const [state, setState] = useState({
    tx: {},
    key: 0
  });

  const handleTxLoad = (tx: any) => {
    setState(state => ({ tx: unhexTransaction(tx), key: state.key + 1 }));
  };

  const handleTxChange = (tx: any) => {
    setState({ ...state, tx });
  };

  const handleSignButton = () => {
    sign(Object.assign({}, { ...hexTransaction(state.tx) }, { chainId: props.networkId }));
  };

  return (
    <>
      <ContractInput
        text="Select file with an unsigned transaction"
        accept=".json,.txt"
        onLoad={handleTxLoad}
        style={{ margin: '0 0 16px 0' }}
      />
      <TransactionDetails tx={state.tx} key={state.key} onChange={handleTxChange} />
      <Button onClick={handleSignButton}>Sign</Button>
    </>
  );
};

export default LoadTransactionView;
