import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import 'antd/dist/antd.css'
import LoginPage from "./Pages/LoginPage/LoginPage";
import CheckPermissions from "./Pages/CheckPermissions";
import CreateUserPage from "./Pages/AdminPage/CreateUserPage";

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Route path="/" exact component={CheckPermissions}/>
          <Route path="/login" exact component={LoginPage}/>
          <Route path="/create_user" exact component={CreateUserPage}/>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
