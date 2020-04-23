import React from 'react';
import { Button, Modal, TreeSelect } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { setActiveNetwork, setActiveContract } from '@redux/actions';

import * as nodeLogic from '../../scripts/nodeLogic';
import * as contractLogic from '../../scripts/contractLogic';
// import * as message from '../common/errorMessage';

import './styles.less';

// import NodeForm from './NodeForm';
const TreeNode = TreeSelect.TreeNode;

const addNewNodeKey = 'addNode';

type Props = {};

const NetworkSelect: React.FC<Props> = () => {
  const network = useSelector((state: IReducerStates) => state.network);
  const contract = useSelector((state: IReducerStates) => state.contract);
  const dispatch = useDispatch();
  // const state = {
  //   modalNodeFormVisible: false,
  //   modalConfirmationVisible: false
  // };

  const handleTreeNodeClick = (nodeKey: string) => {
    if (nodeKey === addNewNodeKey) {
      showNodeFormModal();
    } else {
      const node = nodeLogic.getNodeInfo(network.networks, nodeKey);
      if (node) dispatch(setActiveNetwork(node));
      const contractTmp = contractLogic.getFirstContract(contract.contracts, node.id);
      dispatch(setActiveContract(contractTmp));
    }
  };

  const handleEditButtonClick = (e: any, nodeKey: string) => {
    // this.setState({ selectedNode: nodeKey, onHandleAction: this.onEditNode });
    // this.showNodeFormModal();
    // e.stopPropagation();
  };

  const onAddNewNode = (name: string, endpoint: string, id: string) => {
    // if (nodeLogic.existCustomNode(network.networks, name)) {
    //   message.showNodeExist();
    // } else {
    //   closeNodeFormModal();
    //   // this.props.onAddNewNode(name, endpoint, id);
    // }
  };

  const deleteNode = (e: any, nodeKey: string) => {
    // this.setState({ selectedNode: nodeKey });
    // this.showConfirmationModal();
    // e.stopPropagation();
  };

  const onConfirmedDelete = () => {
    // this.props.onDeleteNode(this.state.selectedNode);
    // this.closeConfirmationModal();
  };

  const onEditNode = (name: string, endpoint: string, id: string) => {
    // if (!nodeLogic.checkEditPossible(this.props.nodeList, this.state.selectedNode, name)) {
    //   message.showNodeExist();
    // } else {
    //   this.closeNodeFormModal();
    //   this.props.onEditNode(this.state.selectedNode, name, endpoint, id);
    // }
  };

  const showNodeFormModal = () => {
    // this.setState({
    //   modalNodeFormVisible: true
    // });
  };

  const closeNodeFormModal = () => {
    // this.setState({
    //   modalNodeFormVisible: false
    // });
  };

  const showConfirmationModal = () => {
    // this.setState({
    //   modalConfirmationVisible: true
    // });
  };

  const closeConfirmationModal = () => {
    // this.setState({
    //   modalConfirmationVisible: false
    // });
  };

  const renderTitle = (text: string, nodeKey: string) => {
    return (
      <>
        {text}
        <Button
          type="default"
          name="deleteButton"
          icon="delete"
          size="small"
          style={{ float: 'right' }}
          onClick={e => deleteNode(e, nodeKey)}
        />
        <Button
          type="default"
          icon="edit"
          size="small"
          style={{ float: 'right' }}
          onClick={e => handleEditButtonClick(e, nodeKey)}
        />
      </>
    );
  };

  return (
    <>
      <TreeSelect
        showSearch
        value={network.selected.key}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        treeDefaultExpandAll
        onChange={handleTreeNodeClick}
        style={{ width: '280px' }}
        className="network-select"
      >
        {network.networks.map(network => (
          <TreeNode selectable={false} title={network.type} key={network.type} value={network.type}>
            {network.type === 'My networks'
              ? network.nodes.map(node => (
                  <TreeNode
                    value={node.key}
                    title={renderTitle(node.name, node.key)}
                    key={node.key}
                  />
                ))
              : network.nodes.map(node => (
                  <TreeNode
                    value={node.key}
                    title={`${network.type} ${node.name}`}
                    key={node.key}
                  />
                ))}
          </TreeNode>
        ))}
        <TreeNode title={'Add custom node'} key={addNewNodeKey} value={addNewNodeKey} />
      </TreeSelect>

      {/* <Modal
        visible={this.state.modalNodeFormVisible}
        onOk={this.closeNodeFormModal}
        onCancel={this.closeNodeFormModal}
        footer={null}
        maskClosable={false}
      >
        <NodeForm
          nodeList={this.props.nodeList}
          nodeKey={this.state.selectedNode}
          onSubmit={this.state.onHandleAction}
        />
      </Modal>

      <Modal
        visible={this.state.modalConfirmationVisible}
        onOk={this.onConfirmedDelete}
        onCancel={this.closeConfirmationModal}
        maskClosable={false}
      >
        <p>{'Sure?'}</p>
      </Modal> */}
    </>
  );
};

/*
NetworkSelect.propTypes = {
    web3Provider: PropTypes.object.isRequired
}*/

export default NetworkSelect;
