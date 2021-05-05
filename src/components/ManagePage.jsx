import { BrowserRouter as Router, Route, Switch, useRouteMatch, Link } from 'react-router-dom';

import React from 'react';
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

const { Text, Ty_link } = Typography;
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const LoginPage = () => {
  let match = useRouteMatch();
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
      <Sider width={200} className="site-layout-background">
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
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Switch>
          <Route path={`${match.path}/login`}>
            <Text>欢迎来到登录界面</Text>
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                style = {{width : '80%'}}
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style = {{width : '80%'}}
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Route>

          <Route path={`${match.path}/addbook/one`}>
          </Route>

          <Route path={`${match.path}/addbook/many`}>
          </Route>

          <Route path={`${match.path}/dept/:did`}>
          </Route>
        </Switch>

        </Content>
      </Layout>
    </Layout>
  </Layout>
    
    </>
  );
}

export default LoginPage;
