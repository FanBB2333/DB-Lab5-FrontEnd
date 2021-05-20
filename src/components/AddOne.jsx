import { BrowserRouter as Router, Route, Switch, useRouteMatch, Link } from 'react-router-dom';

import React from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Checkbox, 
  Typography,
  Layout,
  message,
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
import axios from 'axios';

const { Text, Ty_link } = Typography;
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const AddOne = () => {

  const onReset = () => {
    form.resetFields();
  };

  const [form] = Form.useForm();
  const onSubmit = (values) => {
    axios.post('http://localhost:8080/api/book/save', values).then(response => {
      console.log('response: ',response);
      if(response.data === "success!"){
        message.success("success!");
      }
      else{
        message.warning(response.data);
      }
    }).catch( (error) => {
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
      <Form.Item name="bno" label="书号" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item name="btype" label="类别" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item name="bname" label="书名" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item name="press" label="出版社" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item name="year" label="年份" rules={[{ required: false }]}>
        <Input />
      </Form.Item>

      <Form.Item name="author" label="作者" rules={[{ required: false }]}>
        <Input />
      </Form.Item>

      <Form.Item name="price" label="价格" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" >
          入库
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>

      </Form.Item>
    </Form>

    
    </>
  );
}

export default AddOne;
