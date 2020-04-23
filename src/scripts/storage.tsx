const customNetworkField = 'customNetwork';
const contractsField = 'contracts';
const activeNodeField = 'activeNode';
const activeContractField = 'activeContract';

//NODE
export const getActiveNode = function(): INode | undefined {
  const rst = localStorage.getItem(activeNodeField);
  if (!rst) return undefined;
  return JSON.parse(rst) as INode;
};

export const saveActiveNode = function(node: INode) {
  localStorage.setItem(activeNodeField, JSON.stringify(node));
};

export const getCustomNetwork = function(): INetwork | undefined {
  const rst = localStorage.getItem(customNetworkField);
  if (!rst) return undefined;
  return JSON.parse(rst) as INetwork;
};

//CONTRACT
export const getContracts = function(): IContract[] | undefined {
  const rst = localStorage.getItem(contractsField);
  if (!rst) return undefined;
  return JSON.parse(rst) as IContract[];
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
  localStorage.setItem(customNetworkField, JSON.stringify(networks));
};
