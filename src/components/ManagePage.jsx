import { BrowserRouter as Router, Route, Switch, useRouteMatch, Link } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Checkbox, 
  Typography,
  Layout,
  Menu,
  Breadcrumb,
} from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LaptopOutlined, 
  NotificationOutlined,
  TabletOutlined, 
  UploadOutlined,
} from '@ant-design/icons';


import LoginPage from './LoginPage';
import AddOne from './AddOne';
import AddMany from './AddMany';
import BorrowPage from './BorrowPage';
import ReturnPage from './ReturnPage';
import AddCard from './AddCard';
import RemoveCard from './RemoveCard';

const { Text, Ty_link } = Typography;
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const ManagePage = () => {
  let match = useRouteMatch();
  useEffect(() => {
    (async () => {

    })();
  }, []);
  const layout = {
    labelCol: { span: 8, width : '80px' },
    wrapperCol: { span: 16 , width : '80px'},
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
          <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">管理员操作</Menu.Item>
        <Menu.Item key="2">
          <Link to={`/query`}>
            图书查询
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={`/`}>
            返回首页
          </Link>
        </Menu.Item>
        <Menu.Item key="4">敬请期待...</Menu.Item>
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background" >
        <Menu
          mode="inline"
          // defaultSelectedKeys={['1']}
          // defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
          
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="图书入库">
            <Menu.Item key="1">
              <Link to={`${match.path}/addbook/one`}>
                单本入库
              </Link>
            </Menu.Item>

            <Menu.Item key="2">
              <Link to={`${match.path}/addbook/many`}>
                批量入库
              </Link>
            </Menu.Item>

          </SubMenu>
          <Menu.Item icon={<LaptopOutlined />} key="sub2">
            <Link to={`${match.path}/book/borrow`}>
              借书
            </Link>
            
          </Menu.Item>
          <Menu.Item icon={<NotificationOutlined />} key="sub3">
            <Link to={`${match.path}/book/return`}>
              还书
            </Link>
          </Menu.Item>

          <SubMenu key="sub4" icon={<TabletOutlined />} title="借书证管理">
            <Menu.Item key="3">
              <Link to={`${match.path}/card/add`}>
                添加借书证
              </Link>
            </Menu.Item>

            <Menu.Item key="4">
              <Link to={`${match.path}/card/del`}>
                删除借书证
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>

        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>图书管理系统</Breadcrumb.Item>
          <Breadcrumb.Item>管理员操作</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            height: '700px'
          }}
        >
          <Switch>
          {/* <Route path={`${match.path}/login`}>
            <LoginPage></LoginPage>
          </Route> */}

          <Route path={`${match.path}/addbook/one`}>
            <AddOne></AddOne>
          </Route>

          <Route path={`${match.path}/addbook/many`}>
            <AddMany></AddMany>
          </Route>

          <Route path={`${match.path}/book/borrow`}>
            <BorrowPage></BorrowPage>
          </Route>
          <Route path={`${match.path}/book/return`}>
            <ReturnPage></ReturnPage>
          </Route>
          <Route path={`${match.path}/card/add`}>
            <AddCard></AddCard>
          </Route>
          <Route path={`${match.path}/card/del`}>
            <RemoveCard></RemoveCard>
          </Route>

        </Switch>

        </Content>
      </Layout>
    </Layout>
  </Layout>
    
    </>
  );
}

export default ManagePage;
