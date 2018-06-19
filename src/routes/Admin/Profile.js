import React from 'react'
import { connect } from 'react-redux'

import { fetchUserProfile, updateUserProfile, deleteUserProfile } from '../../actions/admin'

const mapStateToProps = state => ({
    profile: state.admin.profile
})

const mapDispatchToProps = dispatch => ({
    fetchUserProfile: idUser => dispatch(fetchUserProfile(idUser)),
    updateUserProfile: idUser => dispatch(updateUserProfile(idUser)),
    deleteUserProfile: idUser => dispatch(deleteUserProfile(idUser))
})

class Profile extends React.Component {

    componentWillMount () {
        let { fetchUserProfile, idUser } = this.props
        console.log('Loggin id from profile', idUser)
        fetchUserProfile(idUser);
    }
    render () {
        let { user, fetching, fetched } = this.props.profile
        let { deleteUserProfile } = this.props
        return (
            <div>
                { 
                    fetching ?
                    null :
                    fetched ?
                    user ?
                    <div class='profile-view'>                        
                        <p>{ JSON.stringify(user) }</p>
                        <p>{ user.name }</p>
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