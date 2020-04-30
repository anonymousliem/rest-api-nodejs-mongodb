import React, { Component } from 'react'
import '../../css/style.css'
import signinImage from '../../images/signin-image.jpg'
export default class index extends Component {
    componentDidMount () {
        
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
                    <a href="/register" className="signup-image-link">Create an account</a>
                  </div>
                  <div className="signin-form">
                    <h2 className="form-title">Login</h2>
                    <form method="POST" className="register-form" id="login-form">
                      <div className="form-group">
                        <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name" /></label>
                        <input type="text" name="your_name" id="your_name" placeholder="Your Name" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="your_pass"><i className="zmdi zmdi-lock" /></label>
                        <input type="password" name="your_pass" id="your_pass" placeholder="Password" />
                      </div>
                      <div className="form-group form-button">
                        <input type="submit" name="signin" id="signin" className="form-submit" defaultValue="Log in" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>

            )
    }
}
