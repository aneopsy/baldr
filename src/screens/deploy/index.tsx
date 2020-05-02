import React, { useState } from 'react';
import { Row, Col, Input, Card } from 'antd';
import { useSelector } from 'react-redux';

import Web3Provider from '../../scripts/web3provider';
import FunctionInputs from '../../components/common/FunctionInputs';
import TransactionParams from '../../components/contract/TransactionParams';
import ContractInput from '../../components/common/ContractInput';
import { sign } from '../../components/common/sign';

import { ContractSendMethod } from 'web3-eth-contract';

import './styles.less';

type Props = {};

const Home: React.FC<Props> = props => {
  const [state, setState] = useState({
    abi: '',
    bytecode: '',
    ethValue: '',
    tx: {} as ContractSendMethod
  });
  const network = useSelector((state: IReducerStates) => state.network);
  // const contract = useSelector((state: IReducerStates) => state.contract);

  // const web3Provider = new Web3Provider(network.selected.endpoint, networkId);

  const handleInputsClick = (inputs: any, ethValue: any) => {
    const web3Provider = new Web3Provider(network.selected.endpoint, network.selected.id);
    const contract = web3Provider.getContract(JSON.parse(state.abi));

    // TODO: check bytecode & abi

    setState({
      ...state,
      ethValue,
      tx: contract.deploy({
        data: state.bytecode,
        arguments: inputs
      })
    });
  };

  const createFunctionInputs = () => {
    try {
      const abiTmp = JSON.parse(state.abi);
      const ctor = abiTmp.find((item: any) => item.type === 'constructor');
      return (
        ctor && (
          <Card className="fly" title="Constructor">
            <div style={{ margin: '8px 0 0 0', textAlign: 'right' }}>
              <FunctionInputs
                inputs={ctor ? ctor.inputs : []}
                ethInput={ctor ? ctor.payable : false}
                button="Generate"
                onClick={handleInputsClick}
              />
            </div>
          </Card>
        )
      );
    } catch (e) {
      return null;
    }
  };

  const handleAbiChange = (e: any) => {
    setState({
      ...state,
      abi: e.target.value
    });
  };

  const handleCodeChange = (e: any) => {
    setState({
      ...state,
      bytecode: e.target.value
    });
  };

  const createTransactionParams = () => {
    return Object.keys(state.tx).length !== 0 ? (
      <TransactionParams tx={state.tx} ethValue={state.ethValue} onSign={(tx: any) => sign(tx)} />
    ) : null;
  };

  const handleFileLoad = (truffleObject: any) => {
    setState({
      ...state,
      abi: JSON.stringify(truffleObject.abi, null, '\t'),
      bytecode: truffleObject.bytecode
    });
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card className="fly" title="Contract">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Input.TextArea
                  rows={16}
                  placeholder="Byte code"
                  value={state.bytecode}
                  onChange={handleCodeChange}
                />
              </Col>
              <Col span={12}>
                <Input.TextArea
                  rows={16}
                  placeholder="ABI/JSON Interface"
                  value={state.abi}
                  onChange={handleAbiChange}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card className="fly" title="Etherscan Importation" />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card className="fly" title="Truffle Importation">
                <ContractInput text="Select truffle-compiled file" onLoad={handleFileLoad} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>{createFunctionInputs()}</Col>
        <Col span={16}>{createTransactionParams()}</Col>
      </Row>
    </>
  );
};

export default Home;
