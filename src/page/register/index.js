import React, { Component } from 'react'
import '../../css/style.css'
import registerImage from '../../images/signup-image.jpg'
import Select from 'react-select';
import {roleList} from '../../../src/Constant'



export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
        };

      }

 handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

    render() {
        const { selectedOption } = this.state;
        return (
            
            <div>
        <section className="signup">
          <div className="container">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                <form method="POST" className="register-form" id="register-form">
       
                  <div className="form-group">
                    <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name" /></label>
                    <input type="text" name="name" id="name" placeholder="Your Name" />
                  </div>
          
                  <div className="form-group">
                    <label htmlFor="email"><i className="zmdi zmdi-email" /></label>
                    <input type="text" name="username" id="username" placeholder="Your Username" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pass"><i className="zmdi zmdi-lock" /></label>
                    <input type="password" name="pass" id="pass" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline" /></label>
                    <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" />
                  </div>
                  <div>
                  <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={roleList}
      />
                  </div>
                 
                  <div className="form-group form-button">
                    <input type="submit" name="signup" id="signup" className="form-submit" defaultValue="Register" />
                  </div>
                </form>
              </div>
              <div className="signup-image">
                <figure><img src={registerImage} alt="sing up image" /></figure>
                <a href="/login" className="signup-image-link">I am already member</a>
              </div>
            </div>
          </div>
        </section> 
            </div>
        )
    }
}
