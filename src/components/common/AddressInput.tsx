import React from 'react';
import { Input } from 'antd';
import * as utils from '../../scripts/utils.js';
// @ts-ignore
import Blockies from 'react-blockies';
import { MinusSquareOutlined } from '@ant-design/icons';

type Props = {
  value: string;
  onChange?: (value: string, isEthAddress: boolean) => void;
  restProps?: any;
};

const AddressInput: React.FC<Props> = props => {
  const handleChange = (e: any) => {
    const isEthAddress = utils.isEthAddress(e.target.value);
    const value = isEthAddress ? utils.validateEthAddress(e.target.value) : e.target.value;

    if (props.onChange) {
      props.onChange(value, isEthAddress);
    }
  };

  const { value, onChange, ...restProps } = props;
  const icon = utils.isEthAddress(props.value) ? (
    <Blockies seed={props.value.toLowerCase()} size={14} scale={1} />
  ) : (
    <MinusSquareOutlined />
  );

  return (
    <Input
      {...restProps}
      value={props.value}
      onChange={handleChange}
      addonBefore={icon}
      autoComplete="off"
    />
  );
};

export default AddressInput;
