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

var is_metamask_approved: boolean = false;
var is_metamask_unlocked: boolean = false;

async function metamaskApproval() {
  if ((window as any).ethereum && (window as any).ethereum._metamask) {
    (window as any).web3 = new Web3((window as any).ethereum);
    is_metamask_approved = await (window as any).ethereum._metamask.isApproved();
    is_metamask_unlocked = await (window as any).ethereum._metamask.isUnlocked();
    (window as any).ethereum.autoRefreshOnNetworkChange = false;
    try {
      if (!is_metamask_unlocked || !is_metamask_approved) {
        var start_time = new Date().getTime() / 1000;

        await (window as any).ethereum.enable();
        var now_time = new Date().getTime() / 1000;
        var did_request_and_user_respond = now_time - start_time > 1.0;
        if (did_request_and_user_respond) {
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
    (window as any).ethereum.on('accountsChanged', function(accounts: string) {
      store.dispatch({
        type: SET_METAMASK_ADDRESS,
        payload: { address: accounts[0] }
      });
    });
    (window as any).ethereum.on('networkChanged', function(network: any) {
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
    const that = this;
    console.log('decrypt');
    return new Promise(function(resolve, reject) {
      if ((window as any).ethereum && !that.isLoaded) {
        (window as any).web3 = new Web3((window as any).ethereum);
        (window as any).ethereum.enable();
        that.isLoaded = true;
      }
      if ((window as any).ethereum) {
        (window as any).ethereum
          .enable()
          .then(() => {
            that
              ._decrypt()
              .then((account: any) => {
                resolve(account);
              })
              .catch((error: any) => {
                reject(error);
              });
          })
          .catch(() => {
            that.isLoaded = false;
            reject(errorCodes.metamaskRejectAccess);
          });
      } else {
        that
          ._decrypt()
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
        (window as any).web3.eth.getAccounts(function(err: any, accounts: any) {
          if (err || !accounts.length) {
            reject(errorCodes.metamaskLocked);
          } else {
            resolve(accounts[0]);
          }
          //SSL
        });
      }
    });
  };

  sendTx = (transaction: any): Promise<any> => {
    const that = this;
    console.log('sendTx');
    return new Promise(function(resolve, reject) {
      that
        .decrypt()
        .then((account: any) => {
          if (transaction.from.toLowerCase() !== account.toLowerCase()) {
            reject({
              code: errorCodes.metamaskWrongAccount,
              message: 'Metamask Wrong Account'
            });
          } else {
            (window as any).web3.eth.getChainId(function(err: any, network: any) {
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
                  (window as any).web3.eth.sendTransaction(that._setGasLimit(transaction), function(
                    err: any,
                    txHash: string
                  ) {
                    if (err) {
                      reject({
                        code: 0,
                        message: err
                      });
                    } else {
                      resolve(txHash);
                    }
                  });
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
