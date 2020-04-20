import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';

import NetworkSelect from '../../components/app/NetworkSelect';
// import * as nodeLogic from '../../scripts/nodeLogic.js';
// import * as contractLogic from '../../scripts/contractLogic.js';

import './styles.less';

const { Header, Sider, Content, Footer } = Layout;

type Props = {};

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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <UserOutlined />
              <span>Contract</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }}>
            {React.createElement(getCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle
            })}
            <NetworkSelect />
          </Header>
          <Content
            style={{
              padding: 12,
              minHeight: 480
            }}
          >
            {props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Baldr ©2020 AneoPsy</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default AppLayout;
