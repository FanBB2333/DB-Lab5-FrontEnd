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
  Table,
  message, 
  Steps,
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
const { Step } = Steps;
const { Search } = Input;

const columns = [
  {
    title: '书号',
    dataIndex: 'bno',
    // key: 'name',
    render: text => <a>{text}</a>,
    sorter: (a, b) => a.bno - b.bno,
  },
  {
    title: '类别',
    dataIndex: 'btype',
    // key: 'age',
  },
  {
    title: '书名',
    dataIndex: 'bname',
    // key: 'address',
  },
  {
    title: '出版社',
    dataIndex: 'press',
    // key: 'address',
  },
  {
    title: '年份',
    dataIndex: 'year',
    // key: 'address',
  },
  {
    title: '作者',
    dataIndex: 'author',
    // key: 'address',
  },
  {
    title: '价格',
    dataIndex: 'price',
    // key: 'address',
  },
  {
    title: '总藏书量',
    dataIndex: 'total',
    // key: 'address',
  },
  {
    title: '库存',
    dataIndex: 'stock',
    // key: 'address',
  }

];

const BorrowPage = () => {
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
    <Text>欢迎来到借书界面</Text>
    <Steps current={stepState} status="process">
      <Step title="输入借书证号" description="点击后查询借书记录" />
      <Step title="输入想要借的书号" description="点击查看是否可供借阅" />
    </Steps>
    <br></br>
    <Search
      style={{width: '40%'}}
      placeholder="在这里键入借书证号"
      allowClear
      enterButton="查询"
      size="large"
      onSearch={onSearchCno}
    />

    <Search
      style={{width: '40%', borderRight: '0px'}}
      placeholder="在这里键入想要借的书号"
      allowClear
      enterButton="尝试借阅"
      size="large"
      onSearch={(value)=>{console.log(value)}}
    />
    <br /> <br /> 
    <Text>该用户已借阅的书目</Text>

    <Table columns={columns} dataSource={bookData} />
    </>
  );
}

export default BorrowPage;
