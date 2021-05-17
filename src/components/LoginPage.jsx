import { BrowserRouter as Router, Route, Switch, useRouteMatch, Link, useHistory } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Checkbox, 
  Typography,
  Layout,
  Menu,
  message,
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
import axios from 'axios';

const { Text, Ty_link } = Typography;
const { Header, Content, Footer } = Layout;

// const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const LoginPage = () => {
  // let match = useRouteMatch();
  // useEffect(() => {
  //   (async () => {
  //     console.log(match.url);

  //   })();
  // }, []);
  const history = useHistory();
  const layout = {
    labelCol: { span: 8, width : '80px' },
    wrapperCol: { span: 16 , width : '80px'},
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  
  const onFinish = (values) => {
    console.log('Success:', values);
    axios.post('http://localhost:8080/api/manager/login'+ "?id=" + values.username + "&pwd=" + values.password).then(response => {
      console.log('response: ',response.data);
      console.log(response.data.id);
      if(response.data.id === "Username not found"){
        message.warning("Username not found");
        return;
      }
      if(response.data.id === "Wrong Password"){
        message.error("Wrong Password");
        return;
      }
      message.success(`Welcome! ${response.data.name}`);
      history.push('/manager');
    }).catch( (error) => {
      console.log(error);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu theme="dark" 
      mode="horizontal" 
      defaultSelectedKeys={['1']}
      onClick={({ item, key, keyPath, domEvent }) => {
        // console.log(key);
        // if(key == '2'){
        //   window.open(`/`,'_self');
        // };
      }}
      >
        <Menu.Item key="1">管理员登录</Menu.Item>
        <Menu.Item key="2"><Link to={`/`}>返回首页</Link></Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>图书管理系统</Breadcrumb.Item>
        <Breadcrumb.Item>管理员登录</Breadcrumb.Item>
      </Breadcrumb>

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

    </Content>
    <Footer style={{ textAlign: 'center' }}>FanBB © 2021</Footer>
  </Layout>

    
    </>
  );
}

export default LoginPage;
