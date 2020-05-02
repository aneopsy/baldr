import errorCodes from './errorCodes';
import Web3 from 'web3';
import { Dispatch, AnyAction } from 'redux';
import {
  setMetamaskAddress,
  setMetamaskNetwork,
  SET_METAMASK_ADDRESS,
  SET_METAMASK_NETWORK,
  UNLOCK_METAMASK
} from '@redux/actions';
import store from '../redux/store';

let IsMetamaskApproved: boolean = false;
let IsMetamaskUnlocked: boolean = false;

async function metamaskApproval() {
  if ((window as any).ethereum && (window as any).ethereum._metamask) {
    (window as any).web3 = new Web3((window as any).ethereum);
    IsMetamaskApproved = await (window as any).ethereum._metamask.isApproved();
    IsMetamaskUnlocked = await (window as any).ethereum._metamask.isUnlocked();
    (window as any).ethereum.autoRefreshOnNetworkChange = false;
    try {
      if (!IsMetamaskUnlocked || !IsMetamaskApproved) {
        const startTime = new Date().getTime() / 1000;

        await (window as any).ethereum.enable();
        const nowTime = new Date().getTime() / 1000;
        const didRequestAndUserRespond = nowTime - startTime > 1.0;
        if (didRequestAndUserRespond) {
          document.location.reload();
        }
      } else {
        store.dispatch({
          type: UNLOCK_METAMASK,
          payload: {}
        });
        store.dispatch({
          type: SET_METAMASK_ADDRESS,
          payload: { address: (window as any).ethereum.selectedAddress }
        });
        store.dispatch({
          type: SET_METAMASK_NETWORK,
          payload: { network: (window as any).ethereum.networkVersion }
        });
      }
    } catch (error) {
      alert(
        `Permission to connect to metamask rejected. Allow Baldr to connect to metamask., ${error}`
      );
    }
    window.removeEventListener('load', metamaskApproval);
    (window as any).ethereum.on('accountsChanged', (accounts: string) => {
      store.dispatch({
        type: SET_METAMASK_ADDRESS,
        payload: { address: accounts[0] }
      });
    });
    (window as any).ethereum.on('networkChanged', (network: any) => {
      store.dispatch({
        type: SET_METAMASK_NETWORK,
        payload: { network }
      });
    });
  }
}

window.addEventListener('load', metamaskApproval);

class Metamask {
  isLoaded: boolean = false;

  checkWeb3 = () => {
    return (window as any).ethereum && (window as any).ethereum.selectedAddress ? true : false;
  };

  _setGasLimit = (transaction: any) => {
    transaction.gas = transaction.gasLimit;
    return transaction;
  };

  decrypt = () => {
    console.log('decrypt');
    return new Promise((resolve, reject) => {
      if ((window as any).ethereum && !this.isLoaded) {
        (window as any).web3 = new Web3((window as any).ethereum);
        (window as any).ethereum.enable();
        this.isLoaded = true;
      }
      if ((window as any).ethereum) {
        (window as any).ethereum
          .enable()
          .then(() => {
            this._decrypt()
              .then((account: any) => {
                resolve(account);
              })
              .catch((error: any) => {
                reject(error);
              });
          })
          .catch(() => {
            this.isLoaded = false;
            reject(errorCodes.metamaskRejectAccess);
          });
      } else {
        this._decrypt()
          .then((account: any) => {
            resolve(account);
          })
          .catch((error: any) => {
            reject(error);
          });
      }
    });
  };

  _decrypt = () => {
    return new Promise((resolve, reject) => {
      if (!this.checkWeb3()) {
        reject(errorCodes.metamaskConnectFailed);
      } else {
        (window as any).web3.eth.getAccounts((err: any, accounts: any) => {
          if (err || !accounts.length) {
            reject(errorCodes.metamaskLocked);
          } else {
            resolve(accounts[0]);
          }
          // SSL
        });
      }
    });
  };

  sendTx = (transaction: any): Promise<any> => {
    console.log('sendTx');
    return new Promise((resolve, reject) => {
      this.decrypt()
        .then((account: any) => {
          if (transaction.from.toLowerCase() !== account.toLowerCase()) {
            reject({
              code: errorCodes.metamaskWrongAccount,
              message: 'Metamask Wrong Account'
            });
          } else {
            (window as any).web3.eth.getChainId((err: any, network: any) => {
              if (err) {
                reject({
                  code: errorCodes.metamaskException,
                  message: ''
                });
              } else {
                if (transaction.chainId !== network.toString()) {
                  console.log('error', transaction.chainId, network.toString());
                  reject({
                    code: errorCodes.metamaskWrongNetwork,
                    message: 'Metamask Wrong Network'
                  });
                } else {
                  (window as any).web3.eth.sendTransaction(
                    this._setGasLimit(transaction),
                    (err: any, txHash: string) => {
                      if (err) {
                        reject({
                          code: 0,
                          message: err
                        });
                      } else {
                        resolve(txHash);
                      }
                    }
                  );
                }
              }
            });
          }
        })
        .catch(error => {
          console.log('ERROR', error);
          reject({
            code: 0,
            message: error
          });
        });
    });
  };
}

export default new Metamask();
