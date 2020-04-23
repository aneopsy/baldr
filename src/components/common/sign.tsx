import * as message from './errorMessage';
import metamask from '../../scripts/metamask';

const sign = (tx: any) => {
  metamask
    .sendTx(tx)
    .then(txHash => {
      message.showTransactionSent(tx.chainId, txHash);
      console.log(JSON.stringify(txHash));
    })
    .catch(error => {
      message.showError(error);
    });
};

export { sign };
