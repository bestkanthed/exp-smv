import React from 'react';
import { connect } from 'react-redux';

import { Tab, TabPanel, TabList, Tabs } from 'react-tabs'

import { sendOtp, setSendOtp, setOtpVerified, registerCustomer } from '../../actions/customer'

const mapStateToProps = state => ({
    otp: state.customer.otp,
    getStarted: state.customer.getStarted
})

const mapDispatchToProps = dispatch => ({
    sendOtp: phone => dispatch(sendOtp(phone)),
    setSendOtp : value => dispatch(setSendOtp(value)),
    setOtpVerified : value => dispatch(setOtpVerified(value)),
    registerCustomer: form => dispatch(registerCustomer(form))
})

class Signup extends React.Component {
    render () {
        let { otp, sendOtp, setSendOtp, setOtpVerified, getStarted, registerCustomer } = this.props
        let name, email, password, phone, userOtp
        return (
            <div class='container login-register'>
                <div class='row brand-icon'><img src="/images/Logos.png" width="180" /></div>
                <Tabs style={{backgroundColor:'rgba(0, 0, 0, 0.05)'}}>
                    <TabList>
                        <Tab>Login</Tab>
                        <Tab>Register</Tab>
                    </TabList>
                    <TabPanel>
                        Login
                    </TabPanel>
                    <TabPanel>
                        <div class='row register'>
                            <input type='text' ref = {node => { name = node }} placeholder='Full Name' />
                            <input type='email' ref = {node => { email = node }} placeholder='Email' />
                            <input type='number' ref = {node => { phone = node }} placeholder='Phone' onChange = { e => {
                                let { value } = phone
                                
                                if(value && value.length === 10) setSendOtp(true)
                                else setSendOtp(false)
                            }} />
                            <button onClick={() => sendOtp(phone.value)} disabled={!otp.sendOtpEnabled}>SEND OTP</button>
                            <input type='number' style={{display : otp.otp ? 'inline-block' : 'none'}} ref = {node => { userOtp = node }}/>
                            <button onClick={() => { if (userOtp.value === otp.otp.toString()) setOtpVerified(true); else alert('OTP sent does not match') }} style={{display : otp.otp ? 'inline-block' : 'none'}}>VERIFY</button>
                            <input type='password' ref = { node => { password = node }} placeholder='Password' />
                            <button onClick={() => { registerCustomer({
                                customer : {
                                    name: name.value,
                                    email: email.value,
                                    phone: phone.value,
                                    password: password.value
                                },
                                order : {
                                    country: getStarted.country
                                }
                            })}} disabled={!otp.otpVerified}>REGISTER</button>                            
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);