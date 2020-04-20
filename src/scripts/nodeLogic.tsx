import config from '../configs/app';
import * as storage from './storage';
// import defaultNodesList from '../stubs/nodeList';

const customNetworkType = 'Customs';
// const customNodesPrefix = 'custom_';

export const getNetworkList = function(): INetwork[] {
  let nodeList: INetwork[] = config.network.networks;
  let network = {
    type: customNetworkType,
    nodes: []
  };
  if (config.storage.nodeList) {
    let customNodes = storage.getCustomNodes();
    if (customNodes) {
      network.nodes = network.nodes.concat(customNodes.nodes);
    }
  }
  nodeList.push(network);
  return nodeList;
};

export const getNodeInfo = (nodeList: INetwork[], key: string): INode => {
  let network = nodeList.find((network: INetwork) =>
    network.nodes.find((node: INode) => node.key === key)
  );
  if (!network) return {} as INode;
  let node = network.nodes.find((node: INode) => node.key === key);
  return node || ({} as INode);
};

export const getInitialNode = function(nodeList: INetwork[]): INode {
  if (config.storage.activeNode) {
    let activeNode = storage.getActiveNode();
    return activeNode || getNodeInfo(nodeList, config.network.defaultNodeKey);
  } else {
    return getNodeInfo(nodeList, config.network.defaultNodeKey);
  }
};

export const saveActiveNode = function(node: INode): void {
  storage.saveActiveNode(node);
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

// export const addCustomNode = function(
//   nodeList: INetwork[],
//   nodeName: string,
//   endpoint: string,
//   networkId: string
// ) {
//   let node = {
//     name: nodeName,
//     key: getCustomNodeKey(nodeName),
//     endpoint: endpoint,
//     id: networkId
//   };

//   const network = nodeList.find(item => item.type === customNetworkType);
//   if (!network) return false;
//   network.nodes.push(node);
//   // storage.saveNetworks(nodeList.find(item => item.type === customNetworkType));
//   return nodeList;
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

// export const getCustomNodeKey = function(nodeName: string) {
//   return customNodesPrefix + nodeName;
// };

export const getNetworkId = function(nodeList: INetwork[], key: string): string {
  return nodeList.reduce((result: INode[][], current) => {
    let tmp = current.nodes.filter((node: INode) => node.key === key);
    if (tmp.length > 0) {
      result.push(tmp);
    }
    return result;
  }, [])[0][0].id;
};
