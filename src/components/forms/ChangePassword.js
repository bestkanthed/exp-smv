import React from 'react';
import { connect } from 'react-redux';
import { postChangePassword } from '../../actions/login';
import './CreateOrder.scss';

const mapDispatchToProps = dispatch => {
  return {
    postChangePassword: password => dispatch(postChangePassword(password))
  }
}

let ChangePassword = ({postChangePassword}) => {
  let password, confirmPassword;
  return (
    <div class='login'>
        <img  style={{paddingTop:'10%'}} src='../../../ops-app/images/Logos.png'/>
        <div style={{marginTop:'10%'}}><button style={{fontSize:'21px', border:'solid 1px #d8d8d8', padding:'5%'}}>Change Password</button></div>
        <div style={{marginTop:'5%'}}>
          <input type="password" placeholder="New Password" class="createOrder background" ref = { node => { password = node; }} /> <br/>
          <input type="password" placeholder="Confirm Password" class="createOrder background" ref = {node => { confirmPassword = node; }} />
            <br/><br/>
            <button style={{marginBottom:'2%'}} type='button' onClick = {() => {
                if(!password.value || password.value.length < 8) return alert('Password should be atleast 8 characters')
                if(password.value !== confirmPassword.value) return alert('Password and confirm password do not match')
                postChangePassword({password: password.value, confirmPassword: password.value})
            }} id='submitLogin' class="btn btn-primary show-requirements-button">Change Password</button>
        </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(ChangePassword);