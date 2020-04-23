import React from 'react';
import { Switch } from 'antd';

type Props = {
  value: boolean;
  onChange: () => void;
};

const BoolInput: React.FC<Props> = props => {
  return (
    <Switch
      checkedChildren="true"
      unCheckedChildren="false"
      checked={props.value}
      onChange={props.onChange}
    />
  );
};

export default BoolInput;
