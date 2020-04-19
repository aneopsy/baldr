import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons';

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
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <VideoCameraOutlined />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <UploadOutlined />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }}>
            {React.createElement(getCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle
            })}
          </Header>
          <Content
            style={{
              padding: 24,
              minHeight: 280
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
