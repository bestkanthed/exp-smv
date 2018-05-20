import React from 'react';
import { connect } from 'react-redux'

import { fetchUserProfile } from '../../actions/admin'

const mapStateToProps = state => ({
    profile: state.admin.profile
})

const mapDispatchToProps = dispatch => ({
    fetchUserProfile: idUser => dispatch(fetchUserProfile(idUser))
})

class Profile extends React.Component {

    componentWillMount () {
        let { fetchUserProfile, idUser } = this.props
        fetchUserProfile(idUser);
    }
    render () {
        let { user } = this.props.profile;
        return (
            <div>{ user ? user.name : 'take care of this lazy loading' }</div>
        )
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Profile);