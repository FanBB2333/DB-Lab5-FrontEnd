import { BrowserRouter as Router, Route, Switch, useRouteMatch, Link } from 'react-router-dom';

import {React, useState} from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Checkbox, 
  Typography,
  Layout,
  Menu,
  Breadcrumb,
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

const layout = {
  labelCol: { span: 8, width : '80px' },
  wrapperCol: { span: 16 , width : '80px'},
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Text, Ty_link } = Typography;
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const ReturnPage = () => {
  let match = useRouteMatch();
  const [stepState, setStepState] = useState(0);
  const [bookData, setBookData] = useState([]);

  const onSearchCno = (value)=>{
    axios.get('/api/book/findByCno' + "?cno=" + value)
    .then(response => {
      // console.log("response:", response);
      setBookData(response.data);
      // console.log("bookData:", response.data);
      message.success('查询成功！');
      setStepState(1);
      
    }).catch( (error) => {
      message.error('查询失败');
      console.log(error);
    });

    console.log(value);
  }
  return (
    <>
    <Text>欢迎来到还书界面</Text>

    
    </>
  );
}

export default ReturnPage;
