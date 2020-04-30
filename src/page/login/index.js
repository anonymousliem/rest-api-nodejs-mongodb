import React, { Component } from 'react'
import '../../css/style.css'
import signinImage from '../../images/signin-image.jpg'
import axios from 'axios'
import {urlUsers} from '../../Constant'

export default class index extends Component {

  constructor(props){
    super(props);
    this.state={
      username : '',
      password : ''
    }
  }
    componentDidMount () {
        
    }

    handleUsername = (e) => {
      var values = e.target.value;
      if(values !== ""){
        this.setState({
          messageErrorUsername : ''
        })
      }
  
      this.setState({
        username : e.target.value
      })
      
    }

    handlePassword = (e) => {
      var valuesPassword = e.target.value;
      if(valuesPassword !== ""){
        this.setState({
          messageErrorPassword : ''
        })
      }
      this.setState({
        password : e.target.value
      })
    }

    onHandleSubmit = () => {
      var username = this.state.username;
      var password = this.state.password;
      if(username === null || username === "" || username === undefined){
        alert('username tidak boleh kosong')
     }
  
     if(password === null || password === "" || username === undefined){
      alert('password tidak boleh kosong')
   }

      if((username !== null && username !== ""  && username !== undefined) && ( password !== null && password !== "" && password !== undefined
      ) ){
        const Header = {
          'Content-Type' : 'application/json'
        }
      
        const Data = {
          username : this.state.username,
          password : this.state.password,
        }
    
        axios({
          method: 'post',
          url: urlUsers + '/login',
          headers: Header,
          data: Data,
        }).then(data => {
          console.log(data.data)
          var token = data.data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("logged", true);
          this.setState({
            logged : true
          })
         // window.location.href = '/';  
         //this.props.history.push('/absensi/listallabsen')
        })
        .then(data => {
          const value = localStorage.getItem('token');
  
          const Headers = {
            'Content-Type' : 'application/json',
            'token' : value,
          }
          axios({
            method: 'get',
            url: urlUsers + '/me',
            headers: Headers,
          }).then(data => {
            var Role = data.data.role;
            var Username = data.data.username;
          
            if(Username !== null && Username !== undefined){
                localStorage.setItem("username", Username);
            }
            if(Role !== null && Role !== undefined){
              localStorage.setItem("Role", Role);
            }
          })
          .then(data => {
            if(localStorage.getItem('Role') == 'admin'){
             this.props.history.push('/admin')
            }
            else{
             this.props.history.push('/user')
            }
          })
          .catch(err => {
            console.log('errornya : ' + err)
          })
        })
        .catch(err => {
          console.log(err)
          alert("username atau password tidak ditemukan")
          });
      }
  
     
       
    }

    render() {
        return (
            <div className="main">
            {/* Sign up form */}
            {/* Sing in  Form */}
            <section className="sign-in">
              <div className="container">
                <div className="signin-content">
                  <div className="signin-image">
                    <figure><img src={signinImage} alt="sing up image" /></figure>
                  </div>
                  <div className="signin-form">
                    <h2 className="form-title">Login</h2>
                   
                      <div className="form-group">
                        <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name" /></label>
                        <input type="text" required onChange={this.handleUsername}  name="username" id="username" placeholder="username" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="your_pass"><i className="zmdi zmdi-lock" /></label>
                        <input type="password" onChange={this.handlePassword} placeholder="Password" autoComplete="current-password"  />
                      </div>
                      <div className="form-group form-button">
                        <input type="submit" onClick={this.onHandleSubmit} name="signin" id="signin" className="form-submit" defaultValue="Log in" />
                      </div>
                 
                  </div>
                </div>
              </div>
            </section>
          </div>

            )
    }
}
