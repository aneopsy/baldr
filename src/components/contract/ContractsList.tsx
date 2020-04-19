import React, { useState } from 'react';
import { Button, List, Card, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
// @ts-ignore
import Blockies from 'react-blockies';
import { shortenEthAddress } from '../../scripts/utils';
import ContractForm from './ContractForm';

import './styles.less';

type Props = {
  onAddContract: any;
  onChangeContract: any;
  onDeleteContract: any;
  activeContract: any;
  contracts: any;
  web3Provider: any;
};

const ContractsList: React.FC<Props> = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfirmationVisible, setModalConfirmationVisible] = useState(false);
  const [deletingContract, setDeletingContract] = useState({ name: null, networkId: null });

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const showConfirmationModal = () => {
    setModalConfirmationVisible(true);
  };

  const closeConfirmationModal = () => {
    setModalConfirmationVisible(false);
  };

  const handleAddButton = (name: string, address: string, networkId: string, abi: string) => {
    props.onAddContract(name, address, networkId, abi);
    closeModal();
  };

  const handleDeleteButton = (e: any, networkId: string, name: string) => {
    setDeletingContract({ networkId, name } as any);
    showConfirmationModal();
    e.stopPropagation();
  };

  const onConfirmedDelete = () => {
    props.onDeleteContract(deletingContract.networkId, deletingContract.name);
    closeConfirmationModal();
  };

  const renderTitle = (contract: any) => {
    return (
      <>
        {contract.name}
        <Button
          type="default"
          name="deleteButton"
          icon={<DeleteOutlined />}
          size="small"
          style={{ float: 'right' }}
          onClick={e => handleDeleteButton(e, contract.networkId, contract.name)}
        />
      </>
    );
  };

  return (
    <>
      <Modal visible={modalVisible} onCancel={closeModal} footer={null} maskClosable={false}>
        <ContractForm onAddContract={handleAddButton} />
      </Modal>
      <List style={{ width: '100%' }}>
        {props.contracts.map((contract: any) => (
          <Card
            onClick={() => props.onChangeContract(contract.name)}
            className={
              props.activeContract && props.activeContract.address === contract.address
                ? 'selectedContract'
                : ''
            }
            key={contract.address}
            bordered={false}
            style={{
              margin: '0 0 16px 0',
              boxShadow: '0 5px 12px 1px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Card.Meta
              avatar={<Blockies seed={contract.address.toLowerCase()} />}
              title={renderTitle(contract)}
              description={shortenEthAddress(contract.address, 4)}
            />
          </Card>
        ))}
      </List>
      <Button type="primary" className="addButton" onClick={showModal}>
        Add contract
      </Button>
      <Modal
        visible={modalConfirmationVisible}
        onOk={onConfirmedDelete}
        onCancel={closeConfirmationModal}
        maskClosable={false}
      >
        <p>{'Sure?'}</p>
      </Modal>
    </>
  );
};

export default ContractsList;
