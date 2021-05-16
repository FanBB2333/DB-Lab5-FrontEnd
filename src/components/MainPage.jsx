import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Link}from 'react-router-dom';
import './MainPage.css';

import React from 'react';
import { 
  Button,
  Layout,
  Menu,
  Space,

} from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const MainPage = () => {
  return (
    <>
    <Layout>
      <Content id='Page1'
        style={{height: '580px'
      }}
      >
        <br /><br /><br /><br />
        <div style={{top: '60%'}}>
          <p id='Title'>图书管理系统</p>
          {/* <Title /> */}
          <p id='Text'>Library Management</p>
        </div>
        <Space style={{height: '450px'}}>
          <Button type="primary"><Link to="/manager">管理员登录</Link></Button>
          <Button type="primary"><Link to="/query">查询</Link></Button>
        </Space>
        
      </Content>
      
      <Footer id='Footer'>
        <div id='inFooter'>
          <div id='InfoBox'>
            <span>
              <p className='Ftitle'>关于我</p>

            </span>
          </div>
        </div>
      </Footer>
    </Layout>

    </>
  );
}

export default MainPage;
