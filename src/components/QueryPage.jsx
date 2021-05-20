import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Menu, 
  Breadcrumb, 
  Button, 
  Typography, 
  Space, 
  Table, 
  Tag, 
  Input, 
  Form, 
  Select, 
  message, 
} from 'antd';
import { uniFetch } from '../utils/apiUtil';
import { AudioOutlined } from '@ant-design/icons';

// import './QueryPage.css';
import axios from 'axios';

const { Option } = Select;
const { Text, Ty_link } = Typography;
const { Header, Content, Footer } = Layout;
const { Search } = Input;
const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 16 },
  style: {width: '80%'}
};
const tailLayout = {
  wrapperCol: { offset: 9, span: 20 },
};

// 书号, 类别, 书名, 出版社, 年份, 作者, 价格, 数量
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
    render: text => <p>{text}</p>,
    sorter: (a, b) => a.year - b.year,
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
    render: text => <div>{text}</div>,
    sorter: (a, b) => a.price - b.price,
    // key: 'address',
  },
  {
    title: '总藏书量',
    dataIndex: 'total',
    render: text => <div>{text}</div>,
    sorter: (a, b) => a.total - b.total,
    // key: 'address',
  },
  {
    title: '库存',
    dataIndex: 'stock',
    render: text => <div>{text}</div>,
    sorter: (a, b) => a.stock - b.stock,
    // key: 'address',
  },
  // {
  //   title: 'Tags',
  //   // key: 'tags',
  //   dataIndex: 'tags',
  //   render: tags => (
  //     <>
  //       {tags.map(tag => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  // {
  //   title: 'Action',
  //   // key: 'action',
  //   dataIndex: 'action',
  //   render: (text, record) => (
  //     <Space size="middle">
  //       <a>Invite {record.name}</a>
  //       <a>Delete</a>
  //     </Space>
  //   ),
  // },
];

// const data = [
//   {
//   bno: "001",
//   btype: "小说0",
//   bname: "活着",
//   press: "作家出版社",
//   year: "2012",
//   author: "余华",
//   price: 20,
//   total: 5,
//   stock: 1
//   },
//   {
//   bno: "132",
//   btype: "历史",
//   bname: "下沉年代",
//   press: "文汇出版社",
//   year: "2021",
//   author: "乔治·帕克",
//   price: 108,
//   total: 100,
//   stock: 99
//   },
//   {
//   bno: "156",
//   btype: "历史",
//   bname: "明朝那些事儿",
//   press: "中国海关出版社",
//   year: "2009",
//   author: "当年明月",
//   price: 358.2,
//   total: 10,
//   stock: 9
//   },
//   {
//   bno: "255",
//   btype: "回忆录",
//   bname: "你当像鸟飞往你的山",
//   press: "南海出版公司",
//   year: "2019",
//   author: "塔拉·韦斯特弗",
//   price: 59,
//   total: 8,
//   stock: 8
//   },
//   {
//     bno: "310",
//     btype: "回忆录",
//     bname: "我们仨",
//     press: "生活·读书·新知三联书店",
//     year: "2003",
//     author: "杨绛",
//     price: 18.8,
//     total: 12,
//     stock: 5
//   },
//   {
//     bno: "999",
//     btype: "小说",
//     bname: "白夜行",
//     press: "南海出版公司",
//     year: "2013",
//     author: "东野圭吾",
//     price: 39.5,
//     total: 15,
//     stock: 13
//   }
//   ];

const data = [];
const QueryPage = () => {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    (async () => {


    })();
  }, []);

  const onReset = () => {
    form.resetFields();
  };

  const [form] = Form.useForm();
  const onSubmit = (values) => {

    console.log('values: ', values, typeof(values));
    let findParas = "";
    for (let prop in values) {
      if(typeof(values[prop]) !== "undefined"){
        findParas += (prop + "=" + values[prop] + "&&");
      }
    }
    axios.get('/api/book/findBy' + "?" + findParas.substring(0, findParas.length - 2)) // Cut the "&&" in the tail
    .then(response => {
      // console.log("response:", response);
      setBookData(response.data);
      // console.log("bookData:", response.data);
      message.success('查询成功！');
      
    }).catch( (error) => {
      message.error('查询失败');
      console.log(error);
    });

    // console.log(findParas.substring(0, findParas.length - 2)); 
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
        <Menu.Item key="1">免登录查询</Menu.Item>
        <Menu.Item key="2"><Link to={`/`}>返回首页</Link></Menu.Item>
        <Menu.Item key="3">敬请期待...</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>图书管理系统</Breadcrumb.Item>
        <Breadcrumb.Item>查询藏书</Breadcrumb.Item>
      </Breadcrumb>


    <Form {...layout} form={form} name="control-hooks" onFinish={onSubmit}>
      <Form.Item name="btype" label="类别" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item name="bname" label="书名" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item name="press" label="出版社" rules={[{ required: false }]}>
        <Input />
      </Form.Item>

      <Form.Item label="年份" rules={[{ required: false }]} >
        <Form.Item 
          name="minYear"
          style={{ display: 'inline-block' }}>
          <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
        </Form.Item>
        <Input
          className="site-input-split"
          style={{
            width: 30,
            borderLeft: 0,
            borderRight: 0,
            pointerEvents: 'none',
          }}
          placeholder="~"
          disabled
        />
        <Form.Item 
          name="maxYear" 
          style={{ display: 'inline-block' }}>
          <Input style={{ width: 100, textAlign: 'center' }} placeholder="Maximum" />
        </Form.Item>
      </Form.Item>

      <Form.Item name="author" label="作者" rules={[{ required: false }]}>
        <Input />
      </Form.Item>

      <Form.Item label="价格" rules={[{ required: false }]} >
        <Form.Item 
          name="minPrice"
          style={{ display: 'inline-block' }}>
          <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
        </Form.Item>
        <Input
          className="site-input-split"
          style={{
            width: 30,
            borderLeft: 0,
            borderRight: 0,
            pointerEvents: 'none',
          }}
          placeholder="~"
          disabled
        />
        <Form.Item 
          name="maxPrice" 
          style={{ display: 'inline-block' }}>
          <Input style={{ width: 100, textAlign: 'center' }} placeholder="Maximum" />
        </Form.Item>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Space size={100}>
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>

          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>

      <Table columns={columns} dataSource={bookData} />
    </Content>
    <Footer style={{ textAlign: 'center' }}>FanBB © 2021</Footer>
  </Layout>
    <div className="App">
      <div className="App">
        <Button type="primary">Query</Button>
      </div>
    </div>
    </>
  );
}

export default QueryPage;
