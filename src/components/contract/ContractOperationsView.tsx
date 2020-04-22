import React, { useState } from 'react';
import { Collapse } from 'antd';
import FunctionInputs from '../common/FunctionInputs';
import TransactionParams from './TransactionParams';
import { sign } from '../common/sign';
import { checkParamErrors } from '../../scripts/utils';
import { showArgumentsError } from '../common/errorMessage';

type IItem = {
  method: IContractMethod;
  getTx: (name: string, input: any) => Promise<any>;
};

const Item: React.FC<IItem> = props => {
  const [state, setState] = useState({
    tx: null as any,
    ethValue: 0
  });

  const handleInputsClick = (inputs: any, ethValue: any) => {
    const tx = props.getTx(props.method.name, inputs);
    const error = checkParamErrors(tx);

    if (error == null) {
      setState({
        tx,
        ethValue
      });
    } else {
      showArgumentsError(error);
    }
  };

  const handleSignClick = (tx: any) => {
    sign(tx);
  };

  return (
    <>
      <FunctionInputs
        button="Generate"
        inputs={props.method.inputs}
        ethInput={props.method.payable}
        onClick={handleInputsClick}
      />

      {state.tx !== null ? (
        <TransactionParams tx={state.tx} ethValue={state.ethValue} onSign={handleSignClick} />
      ) : null}
    </>
  );
};

type Props = {
  contract: any;
};

const ContractOperationsView: React.FC<Props> = props => {
  const getTxObject = (methodName: string, inputs: any[]) => {
    try {
      return props.contract.methods[methodName](...inputs);
    } catch (e) {
      return null;
    }
  };

  let methods: IContractMethod[] = props.contract._jsonInterface.filter(
    (item: IContractMethod) =>
      item.stateMutability !== 'pure' && item.stateMutability !== 'view' && item.type === 'function'
  );

  return (
    <Collapse>
      {methods.map((method: IContractMethod) => (
        <Collapse.Panel header={method.name} key={`${method.name}-${method.inputs.length}`}>
          <Item method={method} getTx={getTxObject} />
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};

export default ContractOperationsView;
