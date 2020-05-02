import React from 'react';
import { notification } from 'antd';
import { getTxHashUrl } from '../../scripts/etherscan';
import errorText from '../../scripts/errorText';
import errorCodes from '../../scripts/errorCodes';

export type IError = {
  code: number;
  message: string;
  data?: any;
};

const getExplorerLink = (networkId: string, txHash: string) => (
  <a href={getTxHashUrl(networkId, txHash)} target="_blank">
    Check Etherscan
  </a>
);

const getAdditionalText = (error: IError) => {
  switch (error.code) {
    case errorCodes.notifyTransactionSent:
      return <p>{getExplorerLink(error.data.networkId, error.data.txHash)}</p>;

    case errorCodes.errorArguments:
      return <p>{error.data.toString()}</p>;

    default:
      return null;
  }
};

const getErrorMessage = (error: IError) => {
  console.log(error);
  return (
    <>
      <p>{errorText[error.code]}</p>
      {getAdditionalText(error)}
    </>
  );
};

export const showError = (error: IError) => {
  const description = getErrorMessage(error);
  notification.error({
    description,
    message: error.message
  });
};

/**
 * Shows notification message with text specified by code
 * @param {message code} code
 * @param {additional data} data
 */
export const showNotification = (error: IError) => {
  const description = getErrorMessage(error);
  notification.info({
    description,
    message: error.message
  });
};

export const showTransactionSent = (networkId: string, txHash: string) => {
  const notif: IError = {
    code: errorCodes.notifyTransactionSent,
    message: 'Info',
    data: { networkId, txHash }
  };
  return showNotification(notif);
};

export const showEstimateGasError = () =>
  showError({
    code: errorCodes.errorEstimateGas,
    message: 'Error'
  });

export const showArgumentsError = (error: any) =>
  showError({
    code: errorCodes.errorArguments,
    message: 'Error',
    data: error
  });

export const showNodeExist = () =>
  showError({
    code: errorCodes.nodeAlreadyExist,
    message: 'Error',
    data: ''
  });

export const showContractExist = () =>
  showError({
    code: errorCodes.contractAlreadyExist,
    message: 'Error',
    data: ''
  });
