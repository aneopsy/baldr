import erc20 from './erc20';
import erc721 from './erc721';
import usdtContractErc20 from './usdtContractErc20';

export default {
  version: '0.1.2beta',

  storage: {
    nodeList: true,
    activeNode: true,
    contractList: true,
    activeContract: true
  },

  stub: {
    contracts: {
      path: '../stubs/contractListStub.js', //TODO:
      use: false
    }
  },

  contacts: {
    email: 'paultevatheis@gmail.com',
    github: 'https://github.com/aneopsy'
  },

  network: {
    defaultNodeKey: 'Mainnet_Infura',
    networks: [
      {
        type: 'Mainnet',
        nodes: [
          {
            name: 'Infura',
            key: 'Mainnet_Infura',
            endpoint: 'https://mainnet.infura.io/v3/4e746989d44440a38a045991dd8872f9',
            id: '1'
          },
          {
            name: 'MEW',
            key: 'Mainnet_mew',
            endpoint: 'https://api.myetherapi.com/eth',
            id: '1'
          }
        ]
      },
      {
        type: 'Ropsten',
        nodes: [
          {
            name: 'Infura',
            key: 'Ropsten_Infura',
            endpoint: 'https://ropsten.infura.io/v3/4e746989d44440a38a045991dd8872f9',
            id: '3'
          },
          {
            name: 'MEW',
            key: 'Ropsten_mew',
            endpoint: 'https://api.myetherapi.com/rop',
            id: '3'
          }
        ]
      },
      {
        type: 'Rinkeby',
        nodes: [
          {
            name: 'Infura',
            key: 'Rinkeby_Infura',
            endpoint: 'https://rinkeby.infura.io/v3/4e746989d44440a38a045991dd8872f9',
            id: '4'
          }
        ]
      },
      {
        type: 'Kovan',
        nodes: [
          {
            name: 'Infura',
            key: 'Kovan_Infura',
            endpoint: 'https://kovan.infura.io/v3/4e746989d44440a38a045991dd8872f9',
            id: '42'
          }
        ]
      },
      {
        type: 'Goerli',
        nodes: [
          {
            name: 'Infura',
            key: 'Goerli_Infura',
            endpoint: 'https://goerli.infura.io/v3/4e746989d44440a38a045991dd8872f9',
            id: '5'
          }
        ]
      }
    ]
  },

  contracts: [usdtContractErc20],

  erc: [erc20, erc721]
};
