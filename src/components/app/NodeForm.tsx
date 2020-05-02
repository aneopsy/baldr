import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import * as nodeLogic from '../../scripts/nodeLogic';

const FormItem = Form.Item;

// TODO: Fix this file

type Props = {
  onSubmit: (nodeName: string, endpoint: string, id: string) => void;
};

const NodeFrom: React.FC<Props> = props => {
  const [state, setState] = useState({
    nodeName: '',
    endpoint: '',
    id: '',
    prevNodeKey: ''
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.onSubmit(state.nodeName, state.endpoint, state.id);
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   let data = {};
  //   if (nextProps.nodeKey !== prevState.prevNodeKey) {
  //     let node = nodeLogic.getCustomNode(nextProps.nodeList, nextProps.nodeKey);
  //     data.prevNodeKey = nextProps.nodeKey;
  //     data.nodeName = node ? node.name : '';
  //     data.endpoint = node ? node.endpoint : '';
  //     data.id = node ? node.id : '';
  //   }
  //   return data;
  // }

  const handleChange = (e: any, item: string) => {
    const data: any = {};
    data[item] = e.target.value;
    setState({ ...state, ...data });
  };

  const buttonText = state.prevNodeKey ? 'Save' : 'Add';
  return (
    <Form onFinish={handleSubmit}>
      <FormItem label="Name">
        <Input
          placeholder="my node"
          value={state.nodeName}
          onChange={e => handleChange(e, 'nodeName')}
          required={true}
          /*validationErrors={{
                            isDefaultRequiredValue: 'Field is required'
                        }}*/
        />
      </FormItem>
      <FormItem label="Endpoint">
        <Input
          placeholder="https://localhost:8545"
          value={state.endpoint}
          onChange={e => handleChange(e, 'endpoint')}
          required={true}
        />
      </FormItem>
      <FormItem label="Chain id">
        <Input placeholder="999" value={state.id} onChange={e => handleChange(e, 'id')} required={true} />
      </FormItem>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NodeFrom;
