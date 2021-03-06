import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchTeams } from '../../actions/admin'

import TeamMember from './teams/TeamMember'
import UserAdd from './teams/UserAdd'

const mapStateToProps = state => ({ teams: state.admin.teams })
const mapDispatchToProps = dispatch => ({ fetchTeams: () => dispatch(fetchTeams()) })

class Teams extends React.Component {
    
    componentWillMount() {
        this.props.fetchTeams()
    }

    render() {
        let { teams, fetching, error } = this.props.teams
        return (
            <div class="faq">
                <h1>Admin Panel</h1>
                <hr/>
                <UserAdd />
                <div class="row manage">
                    {
                        
                        fetching ?
                        <div> Loading </div> :
                        error ?
                        <div> {error.message} </div> :
                        teams ?
                        teams.map(team =>
                            <div class='col-md-12 col-sm-12 col-lg-12' key={team.name}>
                                <h1>{team.name}</h1>
                                <div class='row'>
                                    { 
                                        team.users.map((user, index) =>
                                            <Link to={`/admin/profile/${user._id}`} key={index}>
                                                <TeamMember teamMember={user} />
                                            </Link>
                                        )
                                    }
                                </div>
                            </div>
                        ) :
                        <div> No data </div>
                    }
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Teams)