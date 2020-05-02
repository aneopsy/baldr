import React from 'react';
import { useSelector } from 'react-redux';

import './styles.less';

type Props = {};

const Web3Checker: React.FC<Props> = () => {
  const metamask = useSelector((state: IReducerStates) => state.metamask);

  if (!metamask.address) {
    return (
      <>
        <div className="alert">Web3 Provider is locked</div>
      </>
    );
  }
  return (
    <>
      <div className="alert">{metamask.address}</div>
    </>
  );
};

export default Web3Checker;
