import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import List from './List';
import Add from './Add';
import { 
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import 'whatwg-fetch'; // 兼容fetch
// import TransitionGroup from 'react-transition-group/TransitionGroup';

import './styles/iconfont/iconfont.css';

// function firstChild(props: any) {
//   const childrenArray = React.Children.toArray(props.children);
//   console.log(childrenArray)
//   return childrenArray[0] || null;
// }

ReactDOM.render(
  <Router>
    <div style={{height: '100%'}}>
      {/* <Route exact={true} path="/" children={({match, ...rest}) => (<TransitionGroup component={firstChild}>{match && <App {...rest}/>}</TransitionGroup>)}/>
      <Route exact={true} path="/list" children={({match, ...rest}) => (<TransitionGroup component={firstChild}>{match && <List {...rest}/>}</TransitionGroup>)}/>
      <Route exact={true} path="/add" children={({match, ...rest}) => (<TransitionGroup component={firstChild}>{match && <Add {...rest}/>}</TransitionGroup>)}/>
      <Route exact={true} path="/edit/:name" children={({match, ...rest}) => (<TransitionGroup component={firstChild}>{match && <Add {...rest}/>}</TransitionGroup>)}/>
      <Route exact={true} path="/play/:name" children={({match, ...rest}) => (<TransitionGroup component={firstChild}>{match && <Add {...rest}/>}</TransitionGroup>)}/> */}
       <Route exact={true} path="/" component={App}/>
      <Route path="/list" component={List}/>
      <Route path="/add" component={Add}/>
      <Route path="/edit/:name" component={Add}/>
      <Route path="/play/:name" component={Add}/> 
    </div>
  </Router>
, document.getElementById('root') as HTMLElement
);
registerServiceWorker();
