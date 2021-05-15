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
  message,
  Breadcrumb,
  Table,
  Modal,
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
const { Search } = Input;
const { SubMenu } = Menu;

const columns = [
  {
    title: '书号',
    dataIndex: 'bno',
    // key: 'name',
    render: text => <a>{text}</a>,
    sorter: (a, b) => a.bno - b.bno,
  },
  {
    title: '借阅时间',
    dataIndex: 'borrow_date',
  },
  {
    title: '经手人ID',
    dataIndex: 'id',
  },

];


const RemoveCard = () => {

  const onReset = () => {
    form.resetFields();
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [unreturnedBook, setUnreturnedBook] = useState([]);
  const [currentCno, setCurrentCno] = useState();
  const [bookLen, setBookLen] = useState(-2);

  const [form] = Form.useForm();
  const onSubmit = (values) => {
    // axios.post('http://localhost:8080/api/card/add', values).then(response => {
    //   console.log('response: ',response);
    // }).catch( (error) => {
    //   console.log(error);
    // });

    // console.log(findParas.substring(0, findParas.length - 2)); 
  };





  const onRemove = () => {
    axios.post('/api/card/remove' + "?cno=" + currentCno) 
    .then(response => {
      // console.log(response.data);
      if(response.data){
        message.success('删除成功！');

      }
      else{
        message.error('删除失败');
      }
      
    }).catch( (error) => {
      message.error('删除失败');
      console.log(error);
    });
    setIsModalVisible(false);
  }

  const onSearch = (value) => {
    console.log(value);
    setCurrentCno(value);
    axios.get('/api/card/findByCno' + "?cno=" + value) 
    .then(response => {
      // console.log(response.data);
      if(response.data.length != 1) {
        message.error("借阅证不存在!");
        setBookLen(-1);
      }
      else{
        axios.get('/api/record/remove' + "?cno=" + value) 
        .then(response => {
          // console.log(response.data);
          setUnreturnedBook(response.data);
          setBookLen(response.data.length);
          message.success('查询成功！');
          
        }).catch( (error) => {
          message.error('查询失败');
          console.log(error);
        });
      }
      
    }).catch( (error) => {
      message.error('查询失败');
      console.log(error);
    });


  };

  const CanRemove = (props) => {
    const len = props.dataLen;
    if(len == 0) {
      return(
        <>
          <Text type="success">此借书证可被注销！</Text>
          <Button type="primary" danger onClick={setIsModalVisible}>
            注销借书证
          </Button>
        </>
      )
    }
    else{
      if(len == -1){
        return(
          <>
            <Text mark>此借书证号不存在！</Text>
          </>
        )
      }
      if(len == -2){
        return(
          <>
            <Text mark>请键入需要注销的借书证号！</Text>
          </>
        )
      }
      return(
        <>
          <Text type="warning">此借书证不可被注销！仍有<Text keyboard>{len}</Text>本图书未归还</Text>
          <Table columns={columns} dataSource={unreturnedBook} />

        </>
      )
    }
  }
  return (
    <>
    <Search
      placeholder="输入卡号以检测是否可注销"
      allowClear
      enterButton="查询"
      size="large"
      onSearch={onSearch}
    />
    <CanRemove dataLen={bookLen}/>
    <Modal title="确定要注销借书证吗？" visible={isModalVisible} onOk={onRemove} onCancel={() => setIsModalVisible(false)}>
        <p><Text strong>借书证号:{currentCno}</Text></p>
        <p><Text strong type="danger">请注意，注销操作不可撤回!</Text></p>
        <p><Text strong type="warning">如有需要，请预先备份用户数据!</Text></p>
    </Modal>
    
    </>
  );
}

export default RemoveCard;
