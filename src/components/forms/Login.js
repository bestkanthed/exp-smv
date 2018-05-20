import React from 'react';
import { connect } from 'react-redux';
import { sendLoginRequest } from '../../actions/login';
import axios from 'axios';

/**This should be user action rather as it MAY change the state of the user */

const mapDispatchToProps = dispatch => {
  return {
    sendLoginRequest: credentials => dispatch(sendLoginRequest(credentials))
  }
}

/** Handle login post */

let Login = ({sendLoginRequest}) => {
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
              <a id='forgotPassword'>Forgot?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Login);