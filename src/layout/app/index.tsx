import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SendOutlined,
  FileTextOutlined,
  DeliveredProcedureOutlined
} from '@ant-design/icons';
import config from '../../configs/app';

import Web3Checker from '../../components/app/Web3Checker';
import NetworkSelect from '../../components/app/NetworkSelect';
// import * as nodeLogic from '../../scripts/nodeLogic.js';
// import * as contractLogic from '../../scripts/contractLogic.js';

import './styles.less';

const { Header, Sider, Content, Footer } = Layout;

type Props = { location: any };

const AppLayout: React.FC<Props> = props => {
  const [getCollapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!getCollapsed);
  };

  return (
    <>
      <Layout className="appLayout">
        <Sider trigger={null} collapsible collapsed={getCollapsed}>
          <div className="logo">{getCollapsed ? 'B' : 'Baldr'}</div>
          <Menu
            theme="dark"
            mode="inline"
            // defaultSelectedKeys={['/']}
            selectedKeys={[props.location.pathname]}
          >
            <Menu.Item key="/">
              <FileTextOutlined />
              <span>Contract</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="/deploy">
              <SendOutlined />
              <span>Deploy</span>
              <Link to="/deploy" />
            </Menu.Item>
            <Menu.Item key="/tx">
              <DeliveredProcedureOutlined />
              <span>Transaction</span>
              <Link to="/tx" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }}>
            {React.createElement(getCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle
            })}
            <Web3Checker />
            <NetworkSelect />
          </Header>
          <Content className="content">{props.children}</Content>
          <Footer style={{ textAlign: 'center' }}>Baldr ©2020 AneoPsy - v{config.version}</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default withRouter(AppLayout);
