import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchExperts } from '../../../actions/support'

import '../support.scss';

const mapStateToProps = state => ({
    experts: state.support.experts
})

const mapDispatchToProps = dispatch => ({ fetchExperts: () => dispatch(fetchExperts()) })

class Experts extends React.Component {
    
    componentWillMount() {
        this.props.fetchExperts()
    }

    render() {
        let { experts, fetching, fetched } = this.props.experts
        return (
            fetched ?
            experts ?
            <div class='row'>
                {
                    experts.map(expert => 
                        
                            <Link key={expert._id} to={'/expert/orders?idExpert='+expert._id}>
                                <div class='col-lg-3 col-md-4 col-sm-12 mask-support' key={expert._id}>
                                <p style={{fontFamily:'Demi'}}>{expert.name}</p>
                                <br/>
                                <p style={{fontFamily:'Avenir-Light'}}>Ongoing Orders <span style={{marginLeft:'25%'}}>{expert.onGoingOrders}</span></p>
                                </div>
                            </Link>
                    )
                }
            </div>:
            <div> Server error </div>:
            fetching ?
            <div>Loading</div> :
            null

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experts)