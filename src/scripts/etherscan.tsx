/**
 * Utilities for etherscan-related staff
 */

const getConfig = (networkId: string) => {
  switch (networkId) {
    case '1':
      return { domain: 'etherscan', api: 'api' };
    case '3':
      return { domain: 'ropsten.etherscan', api: 'api-ropsten' };
    case '4':
      return { domain: 'rinkeby.etherscan', api: 'api-rinkeby' };
    case '5':
      return { domain: 'goerli.etherscan', api: 'api-goerli' };
    case '42':
      return { domain: 'kovan.etherscan', api: 'api-kovan' };
    default:
      return { domain: '', api: '' };
  }
};

export const isPublicNetwork = (networkId: string) => getConfig(networkId).domain !== '';

export const getRootUrl = (networkId: string) => `https://${getConfig(networkId).domain}.io`;

export const getTxHashUrl = (networkId: string, txHash: string) =>
  `${getRootUrl(networkId)}/tx/${txHash}`;

export const getAddressUrl = (networkId: string, address: string) =>
  `${getRootUrl(networkId)}/address/${address}`;

export const getApiAbiUrl = (networkId: string, address: string): string => {
  return `https://${
    getConfig(networkId).api
  }.etherscan.io/api?module=contract&action=getabi&address=${address}`;
};
