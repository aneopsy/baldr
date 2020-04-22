import React from 'react';
import CustomInput from './CustomInput.jsx';
import { List } from 'immutable';
import { getDefaultValue } from '../../scripts/utils.js';
import { Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const ArrayInput = (props: any) => {
  const { type, value, onChange } = props;
  const currentValue = List(value);

  const handleItemChange = (item: any, index: number) => {
    if (onChange) {
      onChange(currentValue.set(index, item).toArray());
    }
  };

  const addItem = () => {
    if (onChange) {
      onChange(currentValue.push(getDefaultValue(type)).toArray());
    }
  };

  const removeItem = () => {
    if (onChange) {
      onChange(currentValue.pop().toArray());
    }
  };

  return (
    <>
      <span>
        <Button size="small" onClick={addItem}>
          <PlusOutlined />
        </Button>
      </span>
      <span>
        <Button size="small" onClick={removeItem} disabled={value.length <= 0}>
          <MinusOutlined />
        </Button>
      </span>
      {value.map((item: any, index: number) => (
        <CustomInput
          key={index}
          type={type}
          value={item}
          onChange={(newItem: any) => handleItemChange(newItem, index)}
        />
      ))}
    </>
  );
};

export default ArrayInput;
