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
                                <div class='col-lg-2 col-md-4 col-sm-12 mask support' key={expert._id}>
                                <p>{expert.name}</p>
                                <span style={{paddingLeft:'15%'}}>{expert.onGoingOrders}</span>
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