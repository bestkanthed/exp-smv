import React from 'react';
import { connect } from 'react-redux';
import { sendLoginRequest, forgotPassword } from '../../actions/login';
import axios from 'axios';

/**This should be user action rather as it MAY change the state of the user */

const mapDispatchToProps = dispatch => {
  return {
    sendLoginRequest: credentials => dispatch(sendLoginRequest(credentials)),
    forgotPassword: credentials => dispatch(forgotPassword(credentials))
  }
}

/** Handle login post */

let Login = ({sendLoginRequest, forgotPassword}) => {
  let email, password;
  return (
    <div class="row login-form">
      <div class="col-lg-12">
        <form id="login_form" class="show-requirements">
          <h1>Login</h1>
          <div class="row login-form">
            <div class="col-sm-12">
              <input type="email" name="email" id="email" placeholder="Email ID" required="required" class="form-control"
                ref = {node => {
                  email = node;
                }}
              />
            </div>
            <div class="col-sm-12">
              <input type="password" name="password" id="password" placeholder="Password" required="required" class="form-control"
                ref = {node => {
                  password = node;
                }}
              />
            </div>
            <div class="col-sm-6">
              <button type='button' onClick = {() => sendLoginRequest({email: email.value, password: password.value})} id='submitLogin' class="btn btn-primary show-requirements-button">LOGIN</button>
            </div>
            <div class="col-sm-6">
              <button type='button' onClick = {() => forgotPassword({email: email.value})} id='forgotPassword' class="btn btn-primary show-requirements-button">Forgot Password</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    // <div class='container'>
    //   <div>
    //     <span>
    //     Login
    //     </span>
    //   </div>
    //   <div class='row' style={{display:'inline-block'}}>
    //   <div class='col-lg-2'/>
    //     <input class='col-lg-2' type="email" name="email" id="email" placeholder="Email ID" required="required" class="form-control"
    //             ref = {node => {
    //               email = node;
    //             }}/>
    //   </div>
    //   <div class='col-lg-2'/>
    // </div>
  );
};

export default connect(null, mapDispatchToProps)(Login);