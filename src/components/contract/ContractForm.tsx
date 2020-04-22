import React, { useState } from 'react';
import { Form, Input, Button, Select, Divider, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import AddressInput from '../common/AddressInput';
import ContractInput from '../common/ContractInput';
import NetworkIdSelect from '../common/NetworkIdSelect';
import AbiQueryButton from '../common/AbiQueryButton';
import config from '../../configs/app';

const FormItem = Form.Item;
const { Option } = Select;

type Props = {
  onAddContract: any;
};

const ContractForm: React.FC<Props> = props => {
  const network = useSelector((state: IReducerStates) => state.network);
  const [form] = Form.useForm();
  const [address, setAddress] = useState('');
  const [networkId, setnetworkId] = useState(network.selected.id);

  const handleSubmit = (values: any) => {
    props.onAddContract(values.name, values.address, networkId, values.abi);
  };

  const handleFileLoad = (truffleObject: any) => {
    form.setFieldsValue({
      abi: JSON.stringify(truffleObject.abi, null, '\t')
    });
  };

  const onFormChange = (changedValues: any, allValues: any) => {
    if (changedValues.erc !== 'custom' && allValues !== 'custom') {
      const newErc = config.erc.filter((item: any) => item.type === changedValues.erc);
      if (newErc.length)
        form.setFieldsValue({
          abi: JSON.stringify(
            config.erc.filter((item: any) => item.type === changedValues.erc)[0].abi
          )
        });
    } else form.setFieldsValue({ abi: '' });
  };

  const getEtherscanAbiOptions = () => {
    return {
      address: address,
      networkId: networkId
    };
  };

  const handleEtherscanAbiResponse = (response: any) => {
    console.log(response);
    if (response.status === '1') {
      form.setFieldsValue({ abi: response.result, erc: 'custom' });
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      form={form}
      initialValues={{
        address: '',
        erc: 'custom',
        abi: '',
        name: Math.random()
          .toString(36)
          .substring(7)
      }}
      onValuesChange={onFormChange}
      style={{ margin: '16px 0 0 0' }}
    >
      <Row gutter={16}>
        <Col span={16}>
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
        </Col>
        <Col span={8}>
          <FormItem label="Network id">
            <NetworkIdSelect value={networkId} onChange={setnetworkId} />
          </FormItem>
        </Col>
      </Row>
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
      <FormItem noStyle shouldUpdate={(prevValues, curValues) => prevValues.erc !== curValues.erc}>
        {() => {
          return (
            <FormItem
              label="ABI"
              name="abi"
              style={{ margin: '0 0 8px 0' }}
              rules={[{ required: true, message: 'Please input the ABI' }]}
            >
              <Input.TextArea
                rows={8}
                placeholder="ABI/JSON Interface"
                autoComplete="off"
                disabled={form.getFieldValue('erc') !== 'custom'}
              />
            </FormItem>
          );
        }}
      </FormItem>
      <Row justify="space-between">
        <Col>
          <FormItem
            noStyle
            shouldUpdate={(prevValues, curValues) => prevValues.address !== curValues.address}
          >
            {() => {
              return (
                <FormItem name="etherscan">
                  <AbiQueryButton
                    getOptions={getEtherscanAbiOptions}
                    onResponse={handleEtherscanAbiResponse}
                    disabled={!form.getFieldValue('address').match(/^0x[a-fA-F0-9]{40}$/)}
                  >
                    Import ABI from Etherscan
                  </AbiQueryButton>
                </FormItem>
              );
            }}
          </FormItem>
        </Col>
        <Col>
          <FormItem name="erc" rules={[{ required: true }]}>
            <Select
              style={{ width: '180px' }}
              placeholder="Select an ERC"
              optionFilterProp="children"
            >
              <Option value="custom">Custom</Option>
              {config.erc.map(erc => (
                <Option key={erc.type} value={erc.type}>
                  {erc.type}
                </Option>
              ))}
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Divider />
      <FormItem label="Or load build file">
        <ContractInput text="Select truffle-compiled file" onLoad={handleFileLoad} />
      </FormItem>
      <Form.Item style={{ textAlign: 'right', margin: '0' }}>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContractForm;
