import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchExperts } from '../../../actions/support'

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
            <div class='row experts'>
                {
                    experts.map(expert => 
                        <div class='col-lg-3 col-md-4 col-sm-12' key={expert._id}>
                            <Link to={'/expert/orders?idExpert='+expert._id}>
                                <p>{expert.name}</p>
                                <p>{expert.onGoingOrders}</p>
                            </Link>
                        </div>
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