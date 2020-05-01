import React, { Component } from 'react'
import '../index.css'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
export default class menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role : localStorage.getItem("Role")
        };
      }

    render() {
        return (
            <div>
        <div style={{display : this.state.role === "admin" ? 'block' : 'none' }}>
        <ul>
<li><Link to="/admin">Dashboard</Link></li>
  <li><Link to="/account">Account</Link></li>
  <li><Link to="/note">Note</Link></li>
  <li><Link to="/allnotes">All Notes</Link></li>
  <li><Link to="/logout">Logout</Link></li>
  
</ul> 
        </div>
       
        <div style={{display : this.state.role === "user" ? 'block' : 'none' }}>


<ul>
<li><Link to="/user">Dasboard</Link></li>
  <li><Link to="/note">Note</Link></li>
  <li><Link to="/logout">Logout</Link></li>
</ul>   

 
 </div>
            </div>
        )
    }
}
