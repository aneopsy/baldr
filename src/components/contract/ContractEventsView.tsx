import React, { useState } from 'react';
import { Collapse, Form, Input, Row, Col, Spin } from 'antd';
import EventInputs from '../common/EventInputs';
import EventsGrid from '../common/EventsGrid';

const defaultToBlock = 'latest';
const defaultFromBlock = 0;

type ItemProps = {
  onFetch: any;
  event: any;
};

const Item: React.FC<ItemProps> = props => {
  const [state, setState] = useState({
    fromBlock: '',
    toBlock: '',
    events: null,
    loading: false
  });

  const handleFetchClick = (filter: any) => {
    if (props.onFetch) {
      setState({ ...state, loading: true });
      props
        .onFetch(props.event.name, filter, state.fromBlock, state.toBlock)
        .then((events: any) => {
          setState({ ...state, events, loading: false });
        });
    }
  };

  const handleToBlockChange = (e: any) => {
    setState({
      ...state,
      toBlock: e.target.value
    });
  };

  const handleFromBlockChange = (e: any) => {
    setState({
      ...state,
      fromBlock: e.target.value
    });
  };

  const getIndexedInputs = () => {
    return props.event.inputs.filter((input: any) => input.indexed);
  };

  const indexedInputs = getIndexedInputs();
  return (
    <>
      <Form layout="vertical">
        <Row gutter={8}>
          <Col span={6}>
            <Form.Item label="From block">
              <Input value={state.fromBlock} onChange={handleFromBlockChange} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="To block">
              <Input value={state.toBlock} onChange={handleToBlockChange} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col span={12}>
          <EventInputs button="Fetch" inputs={indexedInputs} onClick={handleFetchClick} />
        </Col>
      </Row>
      <Spin spinning={state.loading}>
        {state.events ? <EventsGrid events={state.events} event={props.event} /> : null}
      </Spin>
    </>
  );
};

type Props = {
  contract: any;
};

const ContractEventsView: React.FC<Props> = props => {
  const fetchEvents = (eventName: any, filter: any, fromBlock: any, toBlock: any) => {
    return props.contract.getPastEvents(eventName, {
      filter,
      fromBlock: fromBlock === '' ? defaultFromBlock : fromBlock,
      toBlock: toBlock === '' ? defaultToBlock : toBlock
    });
  };

  const events = props.contract._jsonInterface.filter((item: any) => item.type === 'event');

  return (
    <Collapse>
      {events.map((event: any, index: any) => (
        <Collapse.Panel header={event.name} key={event.name + index}>
          <Item event={event} onFetch={fetchEvents} />
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};

export default ContractEventsView;
