import config from '../configs/app';
import * as storage from './storage';

import contractListStub from '../stubs/contractListStub';

export const getContractList = function() {
  let savedContracts: IContract[] = [];
  if (config.storage.contractList) {
    const storContracts = storage.getContracts();
    if (storContracts) savedContracts = storContracts;
    else savedContracts = config.contracts;
  }
  if (config.stub.contracts.use) {
    Array.prototype.push.apply(savedContracts, contractListStub);
  }
  return savedContracts;
};

export const getInitialContract = function() {
  const contractList = getContractList();
  if (config.storage.activeContract) {
    let activeContract = storage.getActiveContract();
    return activeContract
      ? getContract(contractList, activeContract.name, activeContract.networkId)
      : undefined;
  } else {
    return undefined;
  }
};

export const saveActiveContract = function(contract: IContract | undefined) {
  storage.saveActiveContract(contract);
};

export const existContract = function(contractList: any, name: string, networkId: string) {
  return getContract(contractList, name, networkId) !== undefined;
};

export const addContract = function(contractList: IContract[], contract: IContract): IContract[] {
  contractList.push(contract);
  storage.saveContracts(contractList);
  return contractList;
};

export const deleteContract = function(
  contractList: IContract[],
  contract: IContract
): IContract[] {
  let index = contractList.indexOf(contract);
  contractList.splice(index, 1);
  storage.saveContracts(contractList);
  return contractList;
};

export const getContract = function(contractList: any, name: string, networkId: string): IContract {
  return contractList.find(
    (contract: IContract) => contract.name === name && contract.networkId === networkId
  );
};

export const getFirstContract = function(
  contractList: any,
  networkId: string
): IContract | undefined {
  let contracts = contractList.filter((contract: IContract) => contract.networkId === networkId);
  return contracts.length > 0 ? contracts[0] : undefined;
};
