import React from 'react';
import { connect } from 'react-redux';
//import SendOtp from 'sendotp';

//const sendOtp = new SendOtp('201993AhfXTDCNZ6OR5aa3a3a5');

class Signup extends React.Component { 
    
    constructor () {
        super()
        this.state = {
            phone: null,
            otp: null,
            sendOtpEnabled: false,
            verifyOtpEnabled: false
        }
    }

    render () {
        return (
            <div class='container login-register'>
                <div class='row brand-icon'><img src="/images/smv_logo.png" width="180" /></div>
                <div class='row login-register-switch'></div>
                <div class='row phone'>
                    <input type='number' onChange = { e => {
                        let phone = e.target.value
                        let sendOtpEnabled = false
                        console.log('Logging nu,ber and the type of nubmer', phone, typeof phone)
                        if(e.target.value && e.target.value.length === 10) sendOtpEnabled = true
                        this.setState({...this.state, phone, sendOtpEnabled})
                    }}/>
                    <button onClick={() => {
                        let otp = Math.floor(1000 + Math.random() * 9000)
                        sendOtp.send(this.state.phone, 'SMVIND', otp, (err, data, response) => {
                            if(err) return alert('Error in sending sms')    
                            this.setState({...this.state, otp, verifyOtpEnabled: true})
                            console.log(data);
                            console.log(response.data);
                        });
                    }} style={{display: sendOtpEnabled ? 'inline-block' : 'none'}}>VERIFY</button>
                    <input type='number' onChange = { e => {
                        if(!otp) this.setState() //disable everything
                        let inputOtp = e.target.value
                        
                        if(e.target.value && e.target.value.length === 10) sendOtpEnabled = true
                        this.setState({...this.state, phone, sendOtpEnabled})
                    }}/>
                    <button onClick={() => {
                        let otp = Math.floor(1000 + Math.random() * 9000)
                        sendOtp.send(this.state.phone, 'SMVIND', otp, (err, data, response) => {
                            if(err) return alert('Error in sending sms')    
                            this.setState({...this.state, otp, verifyOtpEnabled: true})
                            console.log(data);
                            console.log(response.data);
                        });
                    }} style={{display: sendOtpEnabled ? 'inline-block' : 'none'}}>VERIFY</button>
                </div>
            </div>
        );
    }
}

export default Signup;