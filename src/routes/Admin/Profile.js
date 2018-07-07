import React from 'react'
import { connect } from 'react-redux'

import { fetchUserProfile, updateUserProfile, deleteUserProfile } from '../../actions/admin'

const mapStateToProps = state => ({
    profile: state.admin.profile
})

const mapDispatchToProps = dispatch => ({
    fetchUserProfile: idUser => dispatch(fetchUserProfile(idUser)),
    updateUserProfile: (idUser, formData) => dispatch(updateUserProfile(idUser, formData)),
    deleteUserProfile: idUser => dispatch(deleteUserProfile(idUser))
})

class Profile extends React.Component {

    componentWillMount () {
        let { fetchUserProfile, idUser } = this.props
        fetchUserProfile(idUser);
    }
    render () {
        let teams, name, phone
        let { user, fetching, fetched } = this.props.profile
        let { deleteUserProfile, updateUserProfile } = this.props
        return (
            <div>
                { 
                    fetching ?
                    null :
                    fetched ?
                    user ?
                    <div class='profile-view'>                        
                        <form id="update-user-form" >
                            <h3>Update User</h3>
                            <div class="row user-form">
                            <div class="col-sm-12">
                                    <input type="text" placeholder="Name" defaultValue={user.name} ref = {node => {name = node}}/>
                                    <input type="text" placeholder="Phone" defaultValue={user.phone} ref = {node => {phone = node}}/>
                                    {
                                        user.teams.indexOf('customer') === -1 ?
                                        <select multiple={true} required="required" defaultValue={user.teams} ref = {node => { teams = node }}>
                                            <option value='admin'> Admin </option>
                                            <option value='support'> Customer Support </option>
                                            <option value='expert'> Visa Expert </option>
                                        </select> :
                                        'Team : Customer'
                                    }
                                </div>
                                <div class="col-sm-6">
                                    <button type='button' onClick = {e => {
                                        e.preventDefault()
                                        let selectedTeams
                                        if(teams) {
                                            let options = [].slice.call(teams.querySelectorAll('option'))
                                            let selected = options.filter(option => option.selected)
                                            selectedTeams = selected.map(option => option.value)
                                        } else selectedTeams = ['customer']
                                        updateUserProfile(user._id, { name: name.value, phone: phone.value, teams: selectedTeams })
                                    }} id='submitUser' class="btn btn-primary show-requirements-button">
                                        Update User
                                    </button>
                                </div>
                            </div>
                        </form>
                        <button type='button' onClick = { () => { if(confirm("Are you sure you want to delete")) { deleteUserProfile(user._id); window.location.replace('/admin/teams')}} }> Delete User </button>
                    </div> :
                    <p> No such user </p> :
                    <h2>Error connecting to the server</h2> 
                }
            </div>
        )
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Profile);