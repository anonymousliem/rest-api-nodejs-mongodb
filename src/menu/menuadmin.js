import React, { Component } from 'react'
import '../index.css'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
export default class menu extends Component {
    render() {
        return (
            <div>
<ul>
<li><Link to="/admin">Dashboard</Link></li>
  <li><Link to="/account">Account</Link></li>
  <li><Link to="/note">Note</Link></li>
  <li><Link to="/allnotes">All Notes</Link></li>
  
  <li><Link to="/logout">Logout</Link></li>
  
</ul>    
            </div>
        )
    }
}
