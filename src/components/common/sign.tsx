import * as message from './errorMessage';
import metamask from '../../scripts/metamask';

const sign = (tx: any) => {
  metamask
    .sendTx(tx)
    .then((txHash: string) => {
      message.showTransactionSent(tx.chainId, txHash);
      console.log(JSON.stringify(txHash));
    })
    .catch((error: message.IError) => {
      message.showError(error);
    });
};

export { sign };
