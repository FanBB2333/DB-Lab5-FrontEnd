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
  Space,
  message,
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
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const AddCard = () => {

  const onReset = () => {
    form.resetFields();
  };

  const [form] = Form.useForm();
  const onSubmit = (values) => {
    axios.post('http://localhost:8080/api/card/add', values).then(response => {
      console.log('response: ',response);
      if(response.data == "添加成功!"){
        message.success(response.data);
      }
      else{
        message.error(response.data);
      }
    }).catch( (error) => {
        message.error("添加失败!");
        console.log(error);
    });

    // console.log(findParas.substring(0, findParas.length - 2)); 
  };
  
  const layout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 10 },
  };
  const tailLayout = {
    wrapperCol: { offset: 1, span: 8 },
  };

  return (
    <>
    <Form {...layout} form={form} name="control-hooks" onFinish={onSubmit}>
      <Form.Item name="cno" label="卡号" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item name="name" label="姓名" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item name="department" label="单位" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item name="type" label="类别" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
    
      

      <Form.Item {...tailLayout}>
        <Space>
        <Button type="primary" htmlType="submit" >
          添加
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        </Space>
      </Form.Item>
    </Form>

    
    </>
  );
}

export default AddCard;
