import errorCodes from './errorCodes.js';
import * as Web3 from 'web3';

function Metamask() {
  var isLoaded = false;
  var deniedTransactionSignature = 'User denied transaction signature';
  const deniedMessageSignature = '';

  var _checkWeb3 = function() {
    return window.web3 && window.web3.eth;
  };

  var _processError = function(error) {
    if (error.message && error.message.includes(deniedTransactionSignature)) {
      return errorCodes.metamaskReject;
    }
    if (error.message && error.message.includes(deniedMessageSignature)) {
      return errorCodes.metamaskMessageSignReject;
    } else {
      return errorCodes.unknownError;
    }
  };

  var _setGasLimit = function(transaction) {
    transaction.gas = transaction.gasLimit;
    return transaction;
  };

  this.decrypt = function() {
    return new Promise(function(resolve, reject) {
      if (window.ethereum && !isLoaded) {
        window.web3 = new Web3(window.ethereum);
        isLoaded = true;
      }
      if (window.ethereum) {
        window.ethereum
          .enable()
          .then(() => {
            _decrypt()
              .then(account => {
                resolve(account);
              })
              .catch(error => {
                reject(error);
              });
          })
          .catch(() => {
            isLoaded = false;
            reject(errorCodes.metamaskRejectAccess);
          });
      } else {
        _decrypt()
          .then(account => {
            resolve(account);
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  };

  var _decrypt = function() {
    return new Promise(function(resolve, reject) {
      if (!_checkWeb3()) {
        reject(errorCodes.metamaskConnectFailed);
      } else {
        window.web3.eth.getAccounts(function(err, accounts) {
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

  this.sendTx = function(transaction, callback) {
    let thisObject = this;
    return new Promise(function(resolve, reject) {
      thisObject
        .decrypt()
        .then(account => {
          if (transaction.from.toLowerCase() !== account.toLowerCase()) {
            reject(errorCodes.metamaskWrongAccount);
          } else {
            window.web3.eth.getChainId(function(err, network) {
              if (err) {
                reject(errorCodes.metamaskException);
              } else {
                if (transaction.chainId !== network.toString()) {
                  reject(errorCodes.metamaskWrongNetwork);
                } else {
                  window.web3.eth.sendTransaction(_setGasLimit(transaction), function(err, txHash) {
                    if (err) {
                      reject(_processError(err));
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
          reject(error);
        });
    });
  };
}

export default new Metamask();
