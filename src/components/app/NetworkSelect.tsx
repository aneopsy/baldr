import React, { useState } from 'react';
import { Button, TreeSelect, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import { Event } from '../app/Tracking';

import { setActiveNetwork, setActiveContract, addCustomNetwork } from '@redux/actions';

import * as nodeLogic from '../../scripts/nodeLogic';
import * as contractLogic from '../../scripts/contractLogic';
// import * as message from '../common/errorMessage';

import './styles.less';

import NodeForm from './NodeForm';
const TreeNode = TreeSelect.TreeNode;

const addNewNodeKey = 'addNode';

type Props = {};

const NetworkSelect: React.FC<Props> = () => {
  const network = useSelector((state: IReducerStates) => state.network);
  const metamask = useSelector((state: IReducerStates) => state.metamask);
  const contract = useSelector((state: IReducerStates) => state.contract);
  const dispatch = useDispatch();
  const [modalNodeFormVisible, setModalNodeFormVisible] = useState(false);
  const [modalConfirmationVisible, setModalConfirmationVisible] = useState(false);

  const handleTreeNodeClick = (nodeKey: string) => {
    if (nodeKey === addNewNodeKey) {
      showNodeFormModal();
    } else {
      const node = nodeLogic.getNodeInfo(network.networks, nodeKey);
      if (node) dispatch(setActiveNetwork(node));
      const contractTmp = contractLogic.getFirstContract(contract.contracts, node.id);
      Event('Network', 'Switch', JSON.stringify(contractTmp));
      dispatch(setActiveContract(contractTmp));
    }
  };

  // const handleEditButtonClick = (e: any, nodeKey: string) => {
  //   // this.setState({ selectedNode: nodeKey, onHandleAction: this.onEditNode });
  //   // this.showNodeFormModal();
  //   // e.stopPropagation();
  // };

  const deleteNode = (e: any, nodeKey: string) => {
    // this.setState({ selectedNode: nodeKey });
    // this.showConfirmationModal();
  };

  const onConfirmedDelete = () => {
    // this.props.onDeleteNode(this.state.selectedNode);
    closeConfirmationModal();
  };

  const onEditNode = (node: INode) => {
    console.log('add', node);
    dispatch(addCustomNetwork(node));
    closeNodeFormModal();
  };

  const showNodeFormModal = () => {
    setModalNodeFormVisible(true);
  };

  const closeNodeFormModal = () => {
    setModalNodeFormVisible(false);
  };

  // const showConfirmationModal = () => {
  //   // this.setState({
  //   //   modalConfirmationVisible: true
  //   // });
  // };

  const closeConfirmationModal = () => {
    setModalConfirmationVisible(false);
  };

  const renderTitle = (text: string, nodeKey: string) => {
    return (
      <>
        {text}
        <Button
          type="default"
          name="deleteButton"
          size="small"
          icon={<DeleteOutlined />}
          style={{ float: 'right', backgroundColor: 'transparent' }}
          onClick={e => deleteNode(e, nodeKey)}
        />

        {/* <Button
          type="default"
          icon="edit"
          size="small"
          style={{ float: 'right' }}
          onClick={e => handleEditButtonClick(e, nodeKey)}
        /> */}
      </>
    );
  };

  return (
    <div className="network-select">
      <TreeSelect
        showSearch={true}
        value={network.selected.key}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        treeDefaultExpandAll={true}
        onChange={handleTreeNodeClick}
        style={{ width: '280px', margin: '0 8px' }}
        className="tree"
      >
        {network.networks.map(network => (
          <TreeNode selectable={false} title={network.type} key={network.type} value={network.type}>
            {network.type === 'Customs'
              ? network.nodes.map(node => (
                  <TreeNode
                    value={node.key}
                    title={renderTitle(node.name, node.key)}
                    key={node.key}
                  />
                ))
              : network.nodes.map(node => (
                  <TreeNode value={node.key} title={`${node.name}`} key={node.key} />
                ))}
          </TreeNode>
        ))}
        <TreeNode title={'Add custom network'} key={addNewNodeKey} value={addNewNodeKey} />
      </TreeSelect>
      {metamask.network !== network.selected.id ? (
        <div className="alert-message">Your Metamask is not on the same networkId</div>
      ) : (
        ''
      )}
      <Modal
        visible={modalNodeFormVisible}
        onOk={closeNodeFormModal}
        onCancel={closeNodeFormModal}
        footer={null}
        maskClosable={false}
      >
        <NodeForm
          // nodeList={props.nodeList}
          // nodeKey={this.state.selectedNode}
          onSubmit={onEditNode}
        />
      </Modal>

      <Modal
        visible={modalConfirmationVisible}
        onOk={onConfirmedDelete}
        onCancel={closeConfirmationModal}
        maskClosable={false}
      >
        <p>{'Sure?'}</p>
      </Modal>
    </div>
  );
};

export default NetworkSelect;
