import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { mainRoutes } from './routes'
import './Mock.js'
ReactDOM.render(

  // <SiderDemo />, 
  <Router>
    <Switch>
      <Route path="/admin" render={routeProps => <App {...routeProps} />} />
      {mainRoutes.map(route => {
        return <Route key={route.path} path={route.path} component={route.component} />
      })}
      <Redirect to="/404" />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
