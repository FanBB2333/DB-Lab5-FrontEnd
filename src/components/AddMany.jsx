import { BrowserRouter as Router, Route, Switch, useRouteMatch, Link } from 'react-router-dom';

import React from 'react';
import axios from 'axios';
import { 
  Form, 
  Input, 
  Button, 
  Checkbox, 
  Typography,
  Layout,
  Menu,
  Space,
  Divider,
  Upload,
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
  InboxOutlined,
  TabletOutlined, 
  UploadOutlined,
} from '@ant-design/icons';

const { Text, Ty_link } = Typography;
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Dragger } = Upload;
const AddMany = () => {
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

  const props = {
    action: 'http://localhost:8080/api/book/upload',
    multiple: true,
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
        let formData = new FormData();

        formData.append('file',file.originFileObj);
        console.log('formData', formData);
        console.log("originFileObj:",file.originFileObj);

        // axios({
        //     url:'http://localhost:8080/api/book/upload',
        //     method: 'post',
        //     data: formData,
        //     processData: false,// 告诉axios不要去处理发送的数据(重要参数)
        //     contentType: false,   // 告诉axios不要去设置Content-Type请求头
        // }).then((res)=>{
        //     console.log(res)
        // });

      }
    },
    defaultFileList: [],
  };

  return (
    <>
    <Space split={<Divider type="vertical" />}>

    <Text>欢迎使用批量入库功能</Text>
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击或拖拽文件至此以入库</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </Dragger>
    </Space>
      
    </>
  );
}

export default AddMany;
