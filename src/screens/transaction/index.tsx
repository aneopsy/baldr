import React from 'react';
import { Row, Card, Col } from 'antd';
import { useSelector } from 'react-redux';

import LoadTransactionView from '../../components/contract/LoadTransactionView';
import BroadcastTransactionView from '../../components/contract/BroadcastTransactionView';

import './styles.less';

type Props = {};

const Home: React.FC<Props> = props => {
  const network = useSelector((state: IReducerStates) => state.network);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col>
          <Card className="fly" title="Import Unsigned Transaction">
            <LoadTransactionView networkId={network.selected.id} />
          </Card>
        </Col>
        <Col>
          <Card className="fly" title="Broadcast Transaction">
            <BroadcastTransactionView network={network.selected} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Home;
