import React from 'react';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';

import ErrorBoundary from '../../components/app/ErrorBoundary';
import ContractView from '../../components/contract/ContractView';
import ContractList from '../../components/contract/ContractsList';
import Web3Provider from '../../scripts/web3provider';

import './styles.less';

type Props = {};

const Home: React.FC<Props> = props => {
  const network = useSelector((state: IReducerStates) => state.network);
  const contract = useSelector((state: IReducerStates) => state.contract);

  const networkId = network.selected.id;
  const web3Provider = new Web3Provider(network.selected.endpoint, networkId);

  return (
    <>
      <Row className="home">
        <Col flex="0 0 280px" style={{ width: '280px' }}>
          <ContractList web3Provider={web3Provider} />
        </Col>

        <Col flex="1 1 640px">
          <ErrorBoundary>
            <ContractView
              web3Provider={web3Provider}
              contract={contract.selected}
              key={contract.selected ? contract.selected.address : 'empty'}
            />
          </ErrorBoundary>
        </Col>
      </Row>
    </>
  );
};

export default Home;
