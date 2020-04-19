import React, { useState } from 'react';
import { Row, Col } from 'antd';

// import ContractView from "./ContractView.jsx";
import ContractList from '../../components/contract/ContractsList';
import * as message from '../../components/common/errorMessage';

import * as contractLogic from '../../scripts/contractLogic';
import Web3Provider from '../../scripts/web3provider';

import './styles.less';

type Props = {
  networkId: number;
};

const Home: React.FC<Props> = props => {
  // let contractList = contractLogic.getContractList();
  // const state = {
  //   contractList: contractList,
  //   activeContract: contractLogic.getInitialContract(contractList),
  //   web3Provider: new Web3Provider()
  //   // nextProps.endpoint,
  //   // nextProps.networkId
  // };

  // const { networkId } = props;
  const networkId = '1';

  const [contractList, setContractList] = useState(contractLogic.getContractList());
  const [activeContract, setActiveContract] = useState(
    contractLogic.getInitialContract(contractList)
  );
  // const [networkId, setNetworkId] = useState('1'); //contractLogic.getInitialContract('1'));

  const web3Provider = new Web3Provider('', networkId);
  // this.changeContract = this.changeContract.bind(this);
  // this.addContract = this.addContract.bind(this);
  // this.deleteContract = this.deleteContract.bind(this);

  const changeContract = (name: string) => {
    let newActiveContract = contractLogic.getContract(contractList, name, networkId);
    setActiveContract(newActiveContract);
    contractLogic.saveActiveContract(newActiveContract);
  };

  const addContract = (name: string, address: string, networkId: string, abi: string) => {
    if (contractLogic.existContract(contractList, name, networkId)) {
      message.showContractExist();
    } else {
      const contractListTmp = contractLogic.addContract(
        contractList,
        name,
        address,
        networkId,
        abi
      );
      setContractList(contractListTmp);
    }
  };

  const deleteContract = (networkId: number, name: string) => {
    let contract = contractLogic.getContract(contractList, name, networkId);
    const isDeletingActive = contract === activeContract;
    const newContractList = contractLogic.deleteContract(contractList, contract);
    let newActiveContract = {};
    if (isDeletingActive) {
      contract = contractLogic.getFirstContract(contractList, networkId);
      newActiveContract = { activeContract: contract };
      contractLogic.saveActiveContract(contract);
    }

    setContractList(newContractList);
    setActiveContract(newActiveContract);
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   let data = {};
  //   if (nextProps.endpoint !== prevState.prevEndpoint) {
  //     data.prevEndpoint = nextProps.endpoint;
  //     data.web3Provider = new Web3Provider(
  //       nextProps.endpoint,
  //       nextProps.networkId
  //     );
  //   }
  //   if (nextProps.networkId !== prevState.prevNetworkId) {
  //     let contracts = prevState.contractList.filter(
  //       (contract) => contract.networkId === nextProps.networkId
  //     );
  //     if (prevState.prevNetworkId) {
  //       data.activeContract = contracts.length > 0 ? contracts[0] : undefined;
  //     }
  //     data.prevNetworkId = nextProps.networkId;
  //   }
  //   return data;
  // }

  console.log(contractList, props.networkId);
  return (
    <>
      <Row style={{ height: '100%' }}>
        <Col span={4}>
          <ContractList
            contracts={contractList.filter((contract: any) => contract.networkId === networkId)}
            web3Provider={web3Provider}
            onChangeContract={changeContract}
            onAddContract={addContract}
            onDeleteContract={deleteContract}
            activeContract={activeContract}
          />
        </Col>

        <Col span={20}>
          {/* <ErrorBoundary>
            <ContractView
              web3Provider={this.state.web3Provider}
              contract={this.state.activeContract}
              key={this.state.activeContract ? this.state.activeContract.address : 'empty'}
            />
          </ErrorBoundary> */}
        </Col>
      </Row>
    </>
  );
};

export default Home;
