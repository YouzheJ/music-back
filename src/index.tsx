import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './styles/index.css'
import App from './App'
import List from './List'
import Add from './Add'
import { 
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import 'whatwg-fetch' // 兼容fetch

import './styles/iconfont/iconfont.css'

ReactDOM.render(
  <Router>
    <Route path="/" component={App}/>
    <Route path="/list" component={List}/>
    <Route path="/add" component={Add}/>
    <Route path="/edit/:name" component={Add}/>
    <Route path="/play/:name" component={Add}/>
  </Router>
  , document.getElementById('root') as HTMLElement
);
registerServiceWorker();
