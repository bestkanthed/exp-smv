import React from 'react';
import { connect } from 'react-redux';
import { checkResetToken, resetPassword } from '../actions/login';
import axios from 'axios';

const mapStateToProps = state => ({ reset: state.reset })

const mapDispatchToProps = dispatch => {
  return {
    checkResetToken: token => dispatch(checkResetToken(token)),
    resetPassword : credential => dispatch(resetPassword(credential)) // must change reset to false again
  }
}

class Reset extends React.Component {
    
    componentDidMount () {
        let { match, checkResetToken } = this.props
        checkResetToken(match.params.token)
    }

    render () {
        let password, confirmPassword;
        let { match, resetPassword, reset } = this.props;
        return (
            <div class="row reset-form">
            <div class="col-lg-12">
                <form id="reset_form" class="show-requirements">
                    <h1>Reset</h1>
                    {
                        reset.reset ?
                        <div class="row login-form">
                            New password : <div class="col-sm-12">
                            <input type="password" required="required" class="form-control"
                                ref = {node => {
                                password = node;
                                }}
                            />
                            </div>
                            Confirm password : <div class="col-sm-12">
                            <input type="password" required="required" class="form-control"
                                ref = {node => {
                                confirmPassword = node;
                                }}
                            />
                            </div>
                            <div class="col-sm-6">
                            <button type='button' onClick = {() => resetPassword({
                                password: password.value,
                                confirmPassword: confirmPassword.value,
                                token : match.params.token
                            })} class="btn btn-primary show-requirements-button">RESET</button>
                            </div>
                        </div> :
                        <div> Password reset token is invalid or has expired </div>
                    }
                </form>
            </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reset);