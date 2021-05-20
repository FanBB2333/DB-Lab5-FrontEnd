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
  Steps,
  message,
  Space,
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

const { Text, Ty_link } = Typography;
const { Search } = Input;
const { Step } = Steps;

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const ReturnPage = () => {
  let match = useRouteMatch();
  const [currentCno, setCurrentCno] = useState();
  const [stepState, setStepState] = useState(0);
  const [bookData, setBookData] = useState([]);


  const onSearchCno = (value)=>{
    setCurrentCno(value);

    axios.get('/api/card/findByCno' + "?cno=" + value) 
    .then(response => {
      // console.log(response.data);
      if(response.data.length != 1) {
        message.error("借阅证不存在!");
      }
      else{
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
      }
      
    }).catch( (error) => {
      message.error('查询失败');
      console.log(error);
    });




    console.log(value);
  }

  const onReturn = (value) => {
    axios.get('/api/book/return' + "?borrowbno=" + value + "&cno=" + currentCno )
    .then(response => {
      console.log("borrowdata:", response.data);
      if(response.data === "Can't find the specific book!"){
        message.error("书号不存在！");
      }
      else{
        if (1){
          setStepState(2);
          message.success(`归还${response.data}号图书成功！`);
        }
      }
      
    }).catch( (error) => {
      message.error('查询失败');
      console.log(error);
    });
  }
  return (
    <>
    <Text style={{ padding: '570px', 'font-size': '25px'}} strong >欢迎使用还书功能</Text>
    <Steps current={stepState} status="process">
      <Step title="输入借书证号" description="点击后查询借书记录" />
      <Step title="输入想要还的书号" description="点击尝试归还" />
    </Steps>
    <br></br>
    <Space size={850}>
      <Search
        // style={{width: '40%'}}
        placeholder="在这里键入借书证号"
        allowClear
        enterButton="查询"
        size="large"
        onSearch={onSearchCno}
      />

      <Search
        // style={{width: '100%', borderRight: '-50px',right: '0px'}}
        placeholder="在这里键入想要还的书号"
        allowClear
        enterButton="尝试归还"
        size="large"
        onSearch={onReturn}
      />
    </Space>
    <br /> <br /> 
    <Text>该用户已借阅的书目</Text>

    <Table columns={columns} dataSource={bookData} />
    </>
  );
}

export default ReturnPage;
