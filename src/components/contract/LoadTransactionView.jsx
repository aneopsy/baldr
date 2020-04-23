import React from 'react';
import TransactionDetails from '../common/TransactionDetails';
import ContractInput from '../common/ContractInput';
import { Button } from 'antd';
import { sign } from '../common/sign';
import { unhexTransaction, hexTransaction } from '../../scripts/utils';

class LoadTransactionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tx: {},
      key: 0 //a key to force rerender of TransactionDetails
    };
    this.handleTxLoad = this.handleTxLoad.bind(this);
    this.handleTxChange = this.handleTxChange.bind(this);
    this.handleSignButton = this.handleSignButton.bind(this);
  }

  handleTxLoad(tx) {
    this.setState(state => ({ tx: unhexTransaction(tx), key: state.key + 1 }));
  }

  handleTxChange(tx) {
    this.setState({ tx });
  }

  handleSignButton() {
    sign(
      Object.assign({}, { ...hexTransaction(this.state.tx) }, { chainId: this.props.networkId })
    );
  }

  render() {
    return (
      <>
        <ContractInput
          text="Select file with an unsigned transaction"
          accept=".json,.txt"
          onLoad={this.handleTxLoad}
          style={{ margin: '0 0 16px 0' }}
        />
        <TransactionDetails
          tx={this.state.tx}
          key={this.state.key}
          onChange={this.handleTxChange}
        />
        <Button onClick={this.handleSignButton}>Sign</Button>
      </>
    );
  }
}

export default LoadTransactionView;
