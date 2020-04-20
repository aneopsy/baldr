interface IItem {
  id: number;
  name: string;
}

interface INode {
  name: string;
  key: string;
  endpoint: string;
  id: string;
}

interface INetwork {
  type: string;
  nodes: INode[];
}

interface INetworks {
  selected: INode;
  networks: INetwork[];
}

interface IContract {
  name: string;
  address: string;
  networkId: string;
  abi: JSON;
}

interface IContracts {
  selected: IContract | undefined;
  contracts: IContract[];
}

interface IERC {
  type: string;
  abi: JSON;
}
