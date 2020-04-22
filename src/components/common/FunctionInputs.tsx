import React from 'react';
import { Form, Button } from 'antd';
// import BoolInput from './BoolInput.jsx';
// import AddressInput from './AddressInput.jsx';
import EtherInput from './EtherInput.jsx';
import CustomInput from './CustomInput.jsx';
import { getDefaultValue } from '../../scripts/utils.js';

type Props = {
  ethInput?: boolean;
  inputs: any[];
  onClick: (data: any, ethValue: string) => void;
  button: string;
};

const FunctionInputs: React.FC<Props> = props => {
  // const getInputParamType = (paramName: string) => {
  //   const item = props.inputs.find(item => item.name === paramName);
  //   return item ? item.type : props.inputs[0].type;
  // };

  const handleSubmit = (values: any) => {
    // e.preventDefault();
    // props.form.validateFields((err, values) => {
    //   if (!err) {
    if (props.onClick) {
      const { ETH: ethValue, ...paramValues } = values;

      props.onClick(Object.keys(paramValues).map(key => paramValues[key]), ethValue);
    }
    // }
    // });
  };

  let inputs = props.inputs.map((input: any, index: any) =>
    input.name === '' ? Object.assign({}, input, { name: `Input#${index}` }) : input
  );

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      {inputs.map((input, index) => (
        <Form.Item
          key={input.name}
          label={`${input.name} (${input.type})`}
          name={input.name}
          rules={[
            {
              required: true,
              message: `Please input your ${input.name}`
            }
          ]}
        >
          {/* {getFieldDecorator(input.name, { initialValue: getDefaultValue(input.type) })(
          )} */}
          <CustomInput type={input.type} placeholder={getDefaultValue(input.type)} />
        </Form.Item>
      ))}
      {props.ethInput ? (
        <Form.Item label="ETH To Send">
          {/* {getFieldDecorator('ETH', {})(<EtherInput defaultMode="ether" />)} */}
          <EtherInput defaultMode="ether" />
        </Form.Item>
      ) : null}
      <Form.Item noStyle>
        <Button htmlType="submit">{props.button}</Button>
      </Form.Item>
    </Form>
  );
};

export default FunctionInputs;
