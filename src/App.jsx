import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import React from 'react';
import { Button } from 'antd';

import MainPage from './components/MainPage';
import ManagePage from './components/ManagePage';
import QueryPage from './components/QueryPage';

const App = () => {
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
        <Route path='/manager'>
          {/* <div>login</div> */}
          <ManagePage></ManagePage>
        </Route>
      </Switch>
    </Router>

    </>
  );
}

export default App;
