import * as message from './errorMessage.js';
import metamask from '../../scripts/metamask.js'

/**
 * Signs transaction with metamask and sends it to the node. 
 * Shows notification depending on the outcome 
 * @param {Ethereum transaction object} tx 
 */
const sign = tx => {
    metamask.sendTx(tx)
    .then(txHash => {
        message.showTransactionSent(tx.chainId, txHash);
        console.log(JSON.stringify(txHash));
    })
    .catch(error=> {
        message.showError(error);
    }) 

   /* metamask.sendTx(tx, function(result) {
        if(result.error) {
            message.showError(result.errorCode);
        } else {
            message.showTransactionSent(tx.chainId, result.result[0]);
            console.log(JSON.stringify(result));
        }
    }); */
}

export {sign}