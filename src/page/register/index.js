import React, { Component } from 'react'
import '../../css/style.css'
import registerImage from '../../images/signup-image.jpg'
import Select from 'react-select';
import {roleList} from '../../../src/Constant'
import axios from 'axios'
import {urlUsers} from '../../Constant'


export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            name : '',
            password : '',
            username : '',
            stateRole : ''
        };

      }

      componentDidMount(){
        var Role = localStorage.getItem("Role")
        var status = localStorage.getItem("token");
        if(!status){
            alert('harap login terlebih dahulu');
            this.props.history.push('/login');
        }else{
            if(Role !== "admin"){
                alert('anda tidak punya akses ke sini');
                this.props.history.push('/user');
            }
        }
    }

    handleBack = () => {
      window.location.href = '/account';  
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

    handleName = (e) => {
      var values = e.target.value;
      if(values !== ""){
        this.setState({
          messageErrorUsername : ''
        })
      }
  
      this.setState({
        name : e.target.value
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



 handleChange = selectedOption => {
  this.setState({ selectedOption : selectedOption, stateRole : selectedOption.value});
  };

  onHandleSubmit = () => {
    var username = this.state.username;
    var password = this.state.password;
    var name = this.state.name;
    var role = this.state.stateRole;
    if(!username || !password || !name || !role){
     alert('tidak boleh ada kolom yang kosong');
   }else{
       const Header = {
        'Content-Type' : 'application/json'
      }
    
      const Data = {
        username : this.state.username,
        password : this.state.password,
        name : this.state.name,
        role : this.state.stateRole
      }
        axios({
        method: 'post',
        url: urlUsers + '/register',
        headers: Header,
        data: Data,
      }).then(data => {
        console.log(data.data)
       // window.location.href = '/';  
       alert('berhasil ditambahkan')
       this.props.history.push('/account')
      }).catch(err =>{
        alert(err);
      })
   }

    // if((username !== null && username !== ""  && username !== undefined) && ( password !== null && password !== "" && password !== undefined
    // ) ){
    //   const Header = {
    //     'Content-Type' : 'application/json'
    //   }
    
    //   const Data = {
    //     username : this.state.username,
    //     password : this.state.password,
    //   }
  
    //   axios({
    //     method: 'post',
    //     url: urlUsers + '/login',
    //     headers: Header,
    //     data: Data,
    //   }).then(data => {
    //     console.log(data.data)
    //     var token = data.data.token;
    //     localStorage.setItem("token", token);
    //     localStorage.setItem("logged", true);
    //     this.setState({
    //       logged : true
    //     })
    //    // window.location.href = '/';  
    //    //this.props.history.push('/absensi/listallabsen')
    //   })
    //   .then(data => {
    //     const value = localStorage.getItem('token');

    //     const Headers = {
    //       'Content-Type' : 'application/json',
    //       'token' : value,
    //     }
    //     axios({
    //       method: 'get',
    //       url: urlUsers + '/me',
    //       headers: Headers,
    //     }).then(data => {
    //       var Role = data.data.role;
    //       //var token = data.data.data;
    //       if(Role !== null && Role !== undefined){
    //         localStorage.setItem("Role", Role);
    //       }
    //     })
    //     .then(data => {
    //       if(localStorage.getItem('Role') == 'admin'){
    //         this.props.history.push('/admin')
    //       }
    //       else{
    //         this.props.history.push('/user')
    //       }
    //     })
    //     .catch(err => {
    //       console.log('errornya : ' + err)
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     alert("username atau password tidak ditemukan")
    //     });
    // }  
  }

    render() {
        const { selectedOption } = this.state;
        return (
            
            <div>
        <section className="signup">
          <div className="container">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
              
       
                  <div className="form-group">
                    <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name" /></label>
                    <input type="text" name="name" id="name" onChange={this.handleName}  placeholder="Name" />
                  </div>
          
                  <div className="form-group">
                    <label htmlFor="email"><i className="zmdi zmdi-email" /></label>
                    <input type="text" name="username" onChange={this.handleUsername} id="username" placeholder="Username" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pass"><i className="zmdi zmdi-lock" /></label>
                    <input type="password" onChange={this.handlePassword} name="pass" id="pass" placeholder="Password" />
                  </div>
                  <div>
                  <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={roleList}
      />
                  </div>
                 <br />
                  <div className="form-group form-button">
                    <input type="button"  className="btn btn-warning"  onClick={this.onHandleSubmit} className="btn btn-info" defaultValue="Register" />
                  </div>
               
                  <div className="form-group form-button">
                
                    <input type="button" className="btn btn-danger"  onClick={this.handleBack} defaultValue="Back" />
                  </div>
               
              </div>
              <div className="signup-image">
                <figure><img src={registerImage} alt="sing up image" /></figure>
                {/* <a href="/login" className="signup-image-link">I am already member</a> */}
              </div>
            </div>
          </div>
        </section> 
            </div>
        )
    }
}
