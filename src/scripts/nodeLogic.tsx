import config from '../configs/app';
import * as storage from './storage';
// import defaultNodesList from '../stubs/nodeList';

const customNetworkType = 'Customs';
const customNodesPrefix = 'custom_';

export const getNetworkList = function(): INetwork[] {
  const nodeList: INetwork[] = config.network.networks;
  const network: INetwork = {
    type: customNetworkType,
    nodes: []
  };
  if (config.storage.nodeList) {
    const customNodes = storage.getCustomNetwork();
    if (customNodes) {
      network.nodes = network.nodes.concat(customNodes.nodes);
    }
  }
  nodeList.push(network);
  return nodeList;
};

export const getNodeInfo = (nodeList: INetwork[], key: string): INode => {
  const network = nodeList.find((network: INetwork) =>
    network.nodes.find((node: INode) => node.key === key)
  );
  if (!network) return {} as INode;
  const node = network.nodes.find((node: INode) => node.key === key);
  return node || ({} as INode);
};

export const getInitialNode = function(nodeList: INetwork[]): INode {
  if (config.storage.activeNode) {
    const activeNode = storage.getActiveNode();
    return activeNode || getNodeInfo(nodeList, config.network.defaultNodeKey);
  }
  return getNodeInfo(nodeList, config.network.defaultNodeKey);
};

export const saveActiveNode = function(node: INode): void {
  storage.saveActiveNode(node);
};

// CUSTOM

export const addCustomNode = function(nodeList: INetwork[], node: INode) {
  const network = nodeList.find(item => item.type === customNetworkType);
  if (!network) return false;
  network.nodes.push({ ...node, key: getCustomNodeKey(node.name) });
  const networkCustom = nodeList.find(item => item.type === customNetworkType) || ({} as INetwork);
  storage.saveNetworks(networkCustom);
  return nodeList;
};

// export const existCustomNode = function(nodeList: INetwork[], nodeName: string) {
//   let key = getCustomNodeKey(nodeName);
//   const network = nodeList.find((item: INetwork) => item.type === customNetworkType);
//   if (!network) return false;
//   const node = network.nodes.find((node: INode) => node.key === key) !== undefined;
//   return node;
// };

// export const getCustomNode = function(nodeList: INetwork[], key: string) {
//   const network = nodeList.find(item => item.type === customNetworkType);
//   if (!network) return false;
//   const node = network.nodes.find(node => node.key === key);
//   return node;
// };

// export const checkEditPossible = function(
//   nodeList: INetwork[],
//   oldNodeKey: string,
//   nodeName: string
// ) {
//   // const key = getCustomNodeKey(nodeName);
//   const network = nodeList.find(item => item.type === customNetworkType);
//   if (!network) return false;
//   const node = network.nodes.find((node: INode) => node.name === nodeName);
//   return node === undefined || node.key === oldNodeKey;
// };

// export const deleteCustomNode = function(nodeList: INetwork[], key: string) {
//   // let customNetworks = nodeList.find(item => item.type === customNetworkType);
//   // let node = customNetworks.nodes.find(node => node.key === key);
//   // let index = customNetworks.nodes.indexOf(node);
//   // customNetworks.nodes.splice(index, 1);
//   // storage.saveNetworks(customNetworks);
//   // return nodeList;
// };

// export const editCustomNode = function(
//   nodeList: INetwork[],
//   key: string,
//   nodeName: string,
//   endpoint: string,
//   networkId: string
// ) {
//   // let customNetworks = nodeList.find(item => item.type === customNetworkType);
//   // let node = customNetworks.nodes.find(node => node.key === nodeKey);
//   // let index = customNetworks.nodes.indexOf(node);
//   // customNetworks.nodes[index] = {
//   //   name: nodeName,
//   //   key: getCustomNodeKey(nodeName),
//   //   endpoint: endpoint,
//   //   id: networkId
//   // };
//   // storage.saveNetworks(customNetworks);
//   // return nodeList;
// };

export const getCustomNodeKey = function(nodeName: string) {
  return customNodesPrefix + nodeName;
};

export const getNetworkId = function(nodeList: INetwork[], key: string): string {
  return nodeList.reduce((result: INode[][], current) => {
    const tmp = current.nodes.filter((node: INode) => node.key === key);
    if (tmp.length > 0) {
      result.push(tmp);
    }
    return result;
  }, [])[0][0].id;
};
