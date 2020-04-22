import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, List, Card, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
// @ts-ignore
import Blockies from 'react-blockies';
import { shortenEthAddress } from '../../scripts/utils';
import ContractForm from './ContractForm';
import { setActiveContract, addContract, delContract } from '@redux/actions';

import * as message from '../../components/common/errorMessage';
import * as contractLogic from '../../scripts/contractLogic';

import './styles.less';

type Props = {
  web3Provider: any;
};

const ContractsList: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfirmationVisible, setModalConfirmationVisible] = useState(false);
  const [deletingContract, setDeletingContract] = useState({
    name: '',
    networkId: '',
    address: '',
    abi: {}
  } as IContract);
  const contract = useSelector((state: IReducerStates) => state.contract);
  const network = useSelector((state: IReducerStates) => state.network);

  const networkId = network.selected.id;
  const contractList = contract.contracts.filter(
    (contractItem: IContract) => contractItem.networkId === networkId
  );

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
    if (contractLogic.existContract(contractList, name, networkId)) {
      message.showContractExist();
    } else {
      const contract: IContract = { name, address, networkId, abi: JSON.parse(abi) };
      dispatch(addContract(contract));
      dispatch(setActiveContract(contract));
    }
    closeModal();
  };

  const handleDeleteButton = (e: any, contract: IContract) => {
    setDeletingContract(contract);
    showConfirmationModal();
    e.stopPropagation();
  };

  const onConfirmedDelete = () => {
    dispatch(delContract(deletingContract));
    if (deletingContract === contract.selected) {
      if (contractList.length === 1) dispatch(setActiveContract(undefined));
      else {
        const newFirstActive = contractLogic.getFirstContract(contractList, networkId);
        dispatch(setActiveContract(newFirstActive));
      }
    }
    closeConfirmationModal();
  };

  const onChangeContract = (contract: IContract) => {
    dispatch(setActiveContract(contract));
  };

  const renderTitle = (contract: IContract) => {
    return (
      <>
        {contract.name}
        <Button
          type="default"
          name="deleteButton"
          icon={<DeleteOutlined />}
          size="small"
          style={{ float: 'right' }}
          onClick={e => handleDeleteButton(e, contract)}
        />
      </>
    );
  };

  return (
    <>
      <Modal visible={modalVisible} onCancel={closeModal} footer={null} maskClosable={false}>
        <ContractForm onAddContract={handleAddButton} />
      </Modal>
      <List itemLayout="vertical" style={{ width: '100%' }} className="contract-list">
        {contractList.map((contractItem: IContract) => (
          <Card
            onClick={() => onChangeContract(contractItem)}
            className={
              contract.selected && contract.selected.address === contractItem.address
                ? 'selectedContract'
                : 'fly'
            }
            key={contractItem.address}
            style={{
              margin: '0 0 16px 0'
            }}
          >
            <Card.Meta
              avatar={<Blockies seed={contractItem.address.toLowerCase()} size={16} scale={2} />}
              title={renderTitle(contractItem)}
              description={shortenEthAddress(contractItem.address, 6)}
            />
          </Card>
        ))}
      </List>
      <Button type="primary" className="addButton fly" onClick={showModal}>
        Add contract
      </Button>
      <Modal
        visible={modalConfirmationVisible}
        onOk={onConfirmedDelete}
        onCancel={closeConfirmationModal}
        // maskClosable={false}
        title="Are you sure to delete this contract?"
      >
        <Card>
          <Card.Meta
            avatar={<Blockies seed={deletingContract.address.toLowerCase()} size={16} scale={2} />}
            title={renderTitle(deletingContract)}
            description={shortenEthAddress(deletingContract.address, 16)}
          />
        </Card>
      </Modal>
    </>
  );
};

export default ContractsList;
