const nodesField = 'customNodes';
const contractsField = 'contracts';
const activeNodeField = 'activeNode';
const activeContractField = 'activeContract';

//NODE
export const getActiveNode = function() {
  const rst = localStorage.getItem(activeNodeField);
  if (!rst) return {};
  return JSON.parse(rst);
};

export const saveActiveNode = function(node: INode) {
  localStorage.setItem(activeNodeField, JSON.stringify(node));
};

export const getCustomNodes = function() {
  const rst = localStorage.getItem(nodesField);
  if (!rst) return null;
  return JSON.parse(rst);
};

//CONTRACT
export const getContracts = function() {
  const rst = localStorage.getItem(contractsField);
  if (!rst) return [];
  return JSON.parse(rst);
};

export const saveContracts = function(contracts: IContract[]) {
  localStorage.setItem(contractsField, JSON.stringify(contracts));
};

export const saveActiveContract = function(contract: IContract | undefined) {
  localStorage.setItem(activeContractField, JSON.stringify(contract || ({} as IContract)));
};

export const getActiveContract = function() {
  const rst = localStorage.getItem(activeContractField);
  if (!rst) return [];
  return JSON.parse(rst);
};

//NETWORK
export const saveNetworks = function(networks: INetwork) {
  localStorage.setItem(nodesField, JSON.stringify(networks));
};
