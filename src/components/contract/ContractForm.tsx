import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import AddressInput from '../common/AddressInput.jsx';
import ContractInput from '../common/ContractInput.jsx';
import NetworkIdSelect from '../common/NetworkIdSelect.jsx';

const FormItem = Form.Item;

type Props = {
  onAddContract: any;
};

const ContractForm: React.FC<Props> = props => {
  const [form] = Form.useForm();
  const [address, setAddress] = useState('');
  const [networkId, setnetworkId] = useState('1');

  const handleSubmit = (values: any) => {
    props.onAddContract(values.name, values.address, networkId, values.abi);
  };

  const handleFileLoad = (truffleObject: any) => {
    form.setFieldsValue({
      abi: JSON.stringify(truffleObject.abi, null, '\t')
    });
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      form={form}
      initialValues={{
        abi:
          '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"drip","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]',
        address: '0x2823589Ae095D99bD64dEeA80B4690313e2fB519',
        name: 'test'
      }}
    >
      <FormItem
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input the name'
          }
        ]}
      >
        <Input autoComplete="off" value="test" />
      </FormItem>
      <FormItem
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            pattern: /^0x[a-fA-F0-9]{40}$/,
            message: 'Please input the address'
          }
        ]}
      >
        <AddressInput value={address} onChange={setAddress} />
      </FormItem>
      <FormItem label="Network id">
        <NetworkIdSelect value={networkId} onChange={setnetworkId} />
      </FormItem>
      <FormItem
        label="ABI"
        name="abi"
        rules={[{ required: true, message: 'Please input the ABI' }]}
      >
        <Input.TextArea rows={8} placeholder="ABI/JSON Interface" autoComplete="off" />
      </FormItem>
      <FormItem label="Or load build file">
        <ContractInput text="Select truffle-compiled file" onLoad={handleFileLoad} />
      </FormItem>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContractForm;
