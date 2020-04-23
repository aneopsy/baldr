import React from 'react';
import CustomInput from './CustomInput.jsx';
import { List } from 'immutable';
import { getDefaultValue } from '../../scripts/utils.js';
import { Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

type Props = {
  type: string;
  value: any[];
  onChange?: (array: any[]) => void;
};

const ArrayInput: React.FC<Props> = props => {
  const currentValue = List(props.value);

  const handleItemChange = (item: any, index: number) => {
    if (props.onChange) {
      props.onChange(currentValue.set(index, item).toArray());
    }
  };

  const addItem = () => {
    if (props.onChange) {
      props.onChange(currentValue.push(getDefaultValue(props.type)).toArray());
    }
  };

  const removeItem = () => {
    if (props.onChange) {
      props.onChange(currentValue.pop().toArray());
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
        <Button size="small" onClick={removeItem} disabled={props.value.length <= 0}>
          <MinusOutlined />
        </Button>
      </span>
      {props.value.map((item: any, index: number) => (
        <CustomInput
          key={index}
          type={props.type}
          value={item}
          onChange={(newItem: any) => handleItemChange(newItem, index)}
        />
      ))}
    </>
  );
};

export default ArrayInput;
