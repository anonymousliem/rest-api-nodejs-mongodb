import React, { Component } from 'react'
import '../index.css'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
export default class menu extends Component {
    render() {
        return (
            <div>
            <ul>
  <li><Link to="/note">Note</Link></li>
  <li><Link to="/admin">Admin</Link></li>
  <li><Link to="/user">User</Link></li>
  <li><Link to="/login">Login</Link></li>
</ul>    
            </div>
        )
    }
}
