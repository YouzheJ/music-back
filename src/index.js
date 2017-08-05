import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import Add from './Add';
import { Router, Route, hashHistory } from 'react-router'
import registerServiceWorker from './registerServiceWorker';
import 'whatwg-fetch' // 兼容fetch

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/add" component={Add}/>
  </Router>
  , document.getElementById('root'));
registerServiceWorker();
