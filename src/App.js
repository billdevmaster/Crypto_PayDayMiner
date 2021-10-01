import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Header from './layout/header';
import Footer from './layout/footer';
import Hire from './view/hire';
import store from './redux/store';

import Styled from 'styled-components';

const StyleWrapper = Styled.div`
  .card {
    border-radius: 10px;
    margin: 15px auto;
    padding: 20px;
    font-size: 20px;
    font-family: "Poppins", Sans-serif;
    p {
      margin: 0px;
      line-height: 2;
    }
    .text-bold {
      font-weight: bold;
    } 
  }
  .bg-red {
    background-color: #960101;
  }
  .btn-primary {
    font-weight: bold;
    background-color: #FDC000;
    color: #000;
    border-radius: 10px 10px 10px 10px;
    min-height: 45px;
    border: 0;
    &.full {
      width: 100%;
    }
  }
`;

const App = () => {
  return (
    <StyleWrapper>
      <Provider store={store}>
        <Router>
          <Header/>
          <Switch>
            <Route path="/" component={Hire} />
            <Redirect to="/" />
          </Switch>
        </Router>
        <ToastContainer />
        <Footer />
      </Provider>
    </StyleWrapper>
  );
}

export default App;
