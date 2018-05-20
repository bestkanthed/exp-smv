import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { fetchTeams } from '../../actions/admin'

import TeamMember from './teams/TeamMember'

const mapStateToProps = state => ({ teams: state.admin.teams })
const mapDispatchToProps = dispatch => ({ fetchTeams: () => dispatch(fetchTeams()) })

class Teams extends React.Component {
    
    componentWillMount() {
        this.props.fetchTeams()
    }

    render() {
        let { teams, fetching, error } = this.props.teams
        return (
            <div class="container faq">
                <h1 style={{paddingTop : '32px'}}>Admin Pannel</h1>
                <hr/>
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
                                            <NavLink to={`/admin/profile/${user.id}`} key={index}>
                                                <TeamMember teamMember={user} />
                                            </NavLink>
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