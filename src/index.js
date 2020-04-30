import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/App'
import Note from '../src/page/note/index'
import Admin from './page/admin/index'
import User from './page/user/index' 
import Notfound from './notfound'
import login from '../src/page/login/index'
import register from '../src/page/register/index'
import logout from '../src/page/logout/logout'
import account from '../src/page/account/index'
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
const routing = (
    <Router>
<div>


   <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/note" component={Note} />
        <Route path="/user" component={User} />
        <Route path="/admin" component={Admin} />
        <Route exact path="/login" component={login} />
        <Route exact path="/register" component={register} />
        <Route exact path="/logout" component={logout} />
        <Route exact path="/account" component={account} />
        <Route component={Notfound} />
      </Switch>
    </div>
    </Router>
  )

ReactDOM.render(routing , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
