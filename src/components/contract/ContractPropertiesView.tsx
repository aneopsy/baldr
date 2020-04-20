import React, { useState, useLayoutEffect } from 'react';
// @ts-ignore
import Blockies from 'react-blockies';
import { Skeleton, List, Card, Button, Row, Col } from 'antd';
import FunctionResults from '../common/FunctionResults.jsx';
import { getEtherBalance } from '../../scripts/utils.js';
import FormattedValue from '../common/FormattedValue.jsx';
import { makeCancelable } from '../../scripts/promise.js';
import { SyncOutlined } from '@ant-design/icons';

const CardTitleSpan = 6;

const PropertyCard = (props: any) => (
  <Row style={{ margin: '8px 0 0 0' }}>
    <Col span={6}>
      <span>{props.title}</span>
    </Col>
    <Col span={18}>{props.children}</Col>
  </Row>
);

type Props = {
  contract: any;
};

const ContractPropertiesView: React.FC<Props> = props => {
  const [state, setState] = useState({ data: null, eth: null });

  let request: any = null;

  const fetchProperties = () => {
    //select only constant methods with no parameters
    let methods = props.contract._jsonInterface.filter(
      (item: any) => item.constant === true && item.inputs.length === 0
    );

    let promises = methods.map((method: any) =>
      props.contract.methods[method.name]()
        .call()
        .then((result: any) => ({
          method,
          result
        }))
        .catch((error: any) => ({
          method,
          result: error.toString()
        }))
    );

    return Promise.all(promises);
  };

  const update = () => {
    setState({ data: null, eth: null });
    request = makeCancelable(Promise.all([fetchProperties(), getEtherBalance(props.contract)]));

    request.promise
      .then((results: any) => {
        setState({ data: results[0], eth: results[1] });
      })
      .catch((error: any) => {});
  };

  useLayoutEffect(() => {
    update();
    return () => {
      if (request) {
        request.cancel();
      }
    };
  }, []);

  // if (state.data === null || state.eth === null) {
  //   return <Spin size="large" />;
  // } else {
  return (
    <>
      <Card style={{ margin: '0 0 16px 0' }}>
        <Skeleton
          loading={state.data === null || state.eth === null}
          avatar
          active
          paragraph={{ rows: 2 }}
        >
          <Row style={{ height: '60px' }}>
            <Col>
              <Blockies seed={props.contract._address.toLowerCase()} size={16} scale={4} />
            </Col>
            <Col span={20} style={{ padding: '0 0 0 24px' }}>
              <PropertyCard title="Address" titleSpan={CardTitleSpan}>
                {props.contract._address}
              </PropertyCard>
              <PropertyCard title="ETH Balance" titleSpan={CardTitleSpan}>
                <FormattedValue value={state.eth} type="uint256" mode="e18" />
              </PropertyCard>
            </Col>
          </Row>
        </Skeleton>
      </Card>
      {/* <Card style={{ margin: '0 0 16px 0' }}> */}
      <List
        grid={{ column: 1, gutter: 1 }}
        bordered
        loading={state.data === null || state.eth === null}
        dataSource={state.data || undefined}
        renderItem={(item: any) => (
          <List.Item>
            <PropertyCard title={item.method.name} titleSpan={CardTitleSpan}>
              <FunctionResults method={item.method} result={item.result} />
            </PropertyCard>
          </List.Item>
        )}
        // style={{ display: 'block' }}
        header={<div>Properties</div>}
        style={{ margin: '0 0 16px 0' }}
      />
      {/* </Card> */}
      <Button icon={<SyncOutlined />} onClick={update}>
        Refresh
      </Button>
    </>
  );
};

export default ContractPropertiesView;
