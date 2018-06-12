import React from 'react';
import { connect } from 'react-redux';
import { sendLoginRequest, forgotPassword } from '../../actions/login';
import axios from 'axios';
import {Tabs,Tab,TabList, TabPanel} from 'react-tabs';
import './CreateOrder.scss';

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
    // <div class="row login-form">
    //   <div class="col-lg-12">
    //     <form id="login_form" class="show-requirements">
    //       <h1>Login</h1>
    //       <div class="row login-form">
    //         <div class="col-sm-12">
    //           <input type="email" name="email" id="email" placeholder="Email ID" required="required" class="form-control"
    //             ref = {node => {
    //               email = node;
    //             }}
    //           />
    //         </div>
    //         <div class="col-sm-12">
    //           <input type="password" name="password" id="password" placeholder="Password" required="required" class="form-control"
    //             ref = {node => {
    //               password = node;
    //             }}
    //           />
    //         </div>
    //         <div class="col-sm-6">
    //           <button type='button' onClick = {() => sendLoginRequest({email: email.value, password: password.value})} id='submitLogin' class="btn btn-primary show-requirements-button">LOGIN</button>
    //         </div>
    //         <div class="col-sm-6">
    //           <button type='button' onClick = {() => forgotPassword({email: email.value})} id='forgotPassword' class="btn btn-primary show-requirements-button">Forgot Password</button>
    //         </div>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <div class='login'>
        <img  style={{paddingLeft:'10%', paddingTop:'20%'}} src='../../../images/Logos.png'/>
        <div style={{marginLeft:'40%', marginTop:'20%'}}><button style={{fontSize:'21px', border:'solid 1px #d8d8d8', padding:'5%'}}>Login</button></div>
        <div style={{marginLeft:'18%', marginTop:'5%'}}>
          <input type="email" name="email" id="email" placeholder="Email ID" required="required" class="createOrder background"
                ref = {node => {
                  email = node;
                }}
              /> <br/>
          <input type="password" name="password" id="password" placeholder="Password" required="required" class="createOrder background"
                ref = {node => {
                  password = node;
                }}
              />
              <br/><br/>
            <button style={{marginLeft:'5%'}} type='button' onClick = {() => sendLoginRequest({email: email.value, password: password.value})} id='submitLogin' class="btn btn-primary show-requirements-button">Login</button>
            <button style={{marginLeft:'13%'}} type='button' onClick = {() => forgotPassword({email: email.value})} id='forgotPassword' class="btn btn-primary show-requirements-button">Forgot Password</button>
        </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Login);