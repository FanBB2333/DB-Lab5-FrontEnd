import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import React from 'react';
import { Button } from 'antd';

import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import QueryPage from './components/QueryPage';

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage></MainPage>
        </Route>

        <Route path='/query'>
          {/* <div>query</div> */}
          <QueryPage></QueryPage>
        </Route>
        <Route path='/login'>
          {/* <div>login</div> */}
          <LoginPage></LoginPage>
        </Route>
      </Switch>
    </Router>

    </>
  );
}

export default App;
