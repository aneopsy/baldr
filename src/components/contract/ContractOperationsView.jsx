import React from 'react';
import { Collapse } from 'antd';
import FunctionInputs from '../common/FunctionInputs';
import TransactionParams from './TransactionParams';
import { sign } from '../common/sign.js';
import { checkParamErrors } from '../../scripts/utils';
import { showArgumentsError } from '../common/errorMessage';

/**
 * Item of the operations list.
 * Props:
 * method - method entry of the ABI array
 * getTx - function that receives method's name and inputs and returns web3 tx object
 *  getTx = (methodName, inputs) => web3tx
 */
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tx: null,
      ethValue: 0
    };

    this.handleInputsClick = this.handleInputsClick.bind(this);
    this.handleSignClick = this.handleSignClick.bind(this);
  }

  handleInputsClick(inputs, ethValue) {
    const tx = this.props.getTx(this.props.method.name, inputs);
    const error = checkParamErrors(tx);

    if (error == null) {
      this.setState({
        tx,
        ethValue
      });
    } else {
      showArgumentsError(error);
    }
  }

  handleSignClick(tx) {
    sign(tx);
  }

  render() {
    return (
      <>
        <FunctionInputs
          button="Generate"
          inputs={this.props.method.inputs}
          ethInput={this.props.method.payable}
          onClick={this.handleInputsClick}
        />

        {this.state.tx !== null ? (
          <TransactionParams
            tx={this.state.tx}
            ethValue={this.state.ethValue}
            onSign={this.handleSignClick}
          />
        ) : null}
      </>
    );
  }
}

/**
 * List of contract's operations - non-constant methods with parameters
 * Props:
 *      contract - web3.Contract object
 */
class ContractOperationsView extends React.Component {
  constructor(props) {
    super(props);
    this.getTxObject = this.getTxObject.bind(this);
  }

  /**
   * Calculates tx data and estimatedGas based on parameters
   */
  getTxObject(methodName, inputs) {
    try {
      return this.props.contract.methods[methodName](...inputs);
    } catch (e) {
      return null;
    }
  }

  render() {
    //select only non-constant methods
    let methods = this.props.contract._jsonInterface.filter(
      item =>
        item.stateMutability !== 'pure' &&
        item.stateMutability !== 'view' &&
        item.type === 'function'
    );

    return (
      <Collapse>
        {methods.map(method => (
          <Collapse.Panel header={method.name} key={`${method.name}-${method.inputs.length}`}>
            <Item method={method} getTx={this.getTxObject} />
          </Collapse.Panel>
        ))}
      </Collapse>
    );
  }
}

export default ContractOperationsView;
