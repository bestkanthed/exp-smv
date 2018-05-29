import React from 'react';
import { connect } from 'react-redux';
import { postUserProfile } from '../../../actions/admin';

const mapDispatchToProps = dispatch => {
  return {
    postUserProfile: user => dispatch(postUserProfile(user))
  }
}

let UserAdd = ({postUserProfile}) => {
  let name, email, phone, teams
  return (
    <div class="row add-user">
      <div class="col-lg-12">
        <form id="add-user-form" >
          <h3>Add User</h3>
          <div class="row user-form">
          <div class="col-sm-12">
                <input type="text" placeholder="Name" required="required" ref = {node => {name = node}}/>
                <input type="email" placeholder="Email" required="required" ref = {node => {email = node}}/>
                <input type="text" placeholder="Phone" required="required" ref = {node => {phone = node}}/>
                <select multiple required="required" ref = {node => { teams = node }}>
                    <option value='admin'> Admin </option>
                    <option value='support'> Customer Support </option>
                    <option value='expert'> Visa Expert </option>
                </select>
            </div>
            <div class="col-sm-6">
                <button type='button' onClick = {e => {
                    e.preventDefault()
                    let options = [].slice.call(teams.querySelectorAll('option'))
                    let selected = options.filter(option => option.selected)
                    let selectedTeams = selected.map(option => option.value)
                    postUserProfile({ name: name.value, email: email.value, phone: phone.value, teams: selectedTeams })
                }} id='submitUser' class="btn btn-primary show-requirements-button">
                    Add User
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(UserAdd)