import React, { useState } from 'react';
import TransactionDetails from '../common/TransactionDetails';
import { Button, Input } from 'antd';
import { unsignTransaction, unhexTransaction } from '../../scripts/utils';
import { showArgumentsError, showTransactionSent } from '../common/errorMessage';
import Web3Provider from '../../scripts/web3provider';

type Props = {
  network: INode;
};

const BroadcastTransactionView: React.FC<Props> = props => {
  const [state, setState] = useState({
    signedTx: '',
    key: 0
  });

  const handleSignedTxChange = (e: any) => {
    const signedTx = e.target.value;
    setState({ ...state, signedTx: signedTx, key: state.key + 1 });
  };

  const handleSendButton = () => {
    const web3Provider = new Web3Provider(props.network.endpoint, props.network.id);
    web3Provider
      .sendSignedTx(state.signedTx.startsWith('0x') ? state.signedTx : `0x${state.signedTx}`)
      .on('transactionHash', txHash => {
        showTransactionSent(props.network.id, txHash);
      })
      .on('error', error => {
        showArgumentsError(error.toString());
      })
      .catch(error => {
        showArgumentsError(error.message);
      });
  };

  const unsignedTx = unhexTransaction(unsignTransaction(state.signedTx).tx);
  return (
    <>
      <Input.TextArea
        rows={6}
        value={state.signedTx}
        onChange={handleSignedTxChange}
        placeholder="Input a signed transaction optionally prefixed with 0x"
        style={{ margin: '0 0 16px 0' }}
      />
      <TransactionDetails readonly={true} tx={unsignedTx} key={state.key} />
      <Button onClick={handleSendButton}>Send</Button>
    </>
  );
};

export default BroadcastTransactionView;
