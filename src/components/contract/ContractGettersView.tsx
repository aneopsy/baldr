import React, { useState } from 'react';
import { Card, Collapse, Row, Col } from 'antd';
import FunctionResults from '../common/FunctionResults';
import FunctionInputs from '../common/FunctionInputs';
import * as message from '../common/errorMessage';

type IItem = {
  method: IContractMethod;
  onFetch: (name: string, input: any) => Promise<any>;
};

const Item: React.FC<IItem> = props => {
  const [state, setState] = useState({
    callResult: null
  });

  const handleClick = (inputValues: any[]) => {
    props
      .onFetch(props.method.name, inputValues)
      .then(callResult => {
        setState({ callResult });
      })
      .catch(e => {
        message.showArgumentsError(e);
      });
  };

  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          <FunctionInputs button="Fetch" onClick={handleClick} inputs={props.method.inputs} />
        </Col>
        <Col span={12}>
          {state.callResult != null ? (
            <Card title="Fetch results" bordered={false}>
              <FunctionResults method={props.method} result={state.callResult} />
            </Card>
          ) : null}
        </Col>
      </Row>
    </>
  );
};

type Props = {
  contract: any;
};

const ContractGettersView: React.FC<Props> = props => {
  const fetch = (methodName: string, methodParams: any) => {
    return new Promise((resolve, reject) => {
      props.contract.methods[methodName](...methodParams)
        .call()
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  };

  const methods: IContractMethod[] = props.contract._jsonInterface.filter(
    (item: IContractMethod) =>
      (item.stateMutability === 'pure' || item.stateMutability === 'view') && item.inputs.length > 0
  );

  return (
    <Collapse>
      {methods.map((method: IContractMethod) => (
        <Collapse.Panel header={method.name} key={`${method.name}-${method.inputs.length}`}>
          <Item method={method} onFetch={fetch} />
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};

export default ContractGettersView;
