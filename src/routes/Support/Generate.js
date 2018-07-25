import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadPopup } from '../../actions/popup'
import { fetchExperts, startAuthtenication } from '../../actions/support'

import Experts from './generate/Experts'
import Customers from './generate/Customers'

import './support.scss';

const mapDispatchToProps = dispatch => {
    return {
        showCreateCustomerCumOrderPopup: () => dispatch(loadPopup('CreateCustomerCumOrder')),
        fetchExperts: () => dispatch(fetchExperts()), 
        startAuthentication : (supportId) => dispatch(startAuthtenication(supportId))
    }
}

const mapStateToProps = state => ({
    user : state.user.user, 
    payments : state.support.payments
})

class Generate extends React.Component {
    
    constructor(props) {
        super(props)
        this.props.startAuthentication(this.props.user._id)
    }

    componentWillMount() {
        this.props.fetchExperts()
    }

    render() {
        return (
            <div class="support">
                <div>
                    <br/><br/>
                    <button class='button-mask' onClick={this.props.showCreateCustomerCumOrderPopup}>
                        Create Order
                    </button>
                    <Link to='/support/new' style={{color: '#4a4a4a', textDecoration: 'none'}}>
                        <button class='button-mask'>
                            New Orders
                        </button>
                    </Link>
                    <button onClick={() => {window.location=this.props.payments.data}}>
                        generate payments
                    </button>
                    <br/><br/>
                </div>
                <div>
                    <div>
                        <p> Experts : <Experts /> </p>
                    </div>
                    <div>
                        <p> Customers : <Customers /> </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Generate);