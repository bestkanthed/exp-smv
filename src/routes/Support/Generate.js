import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadPopup } from '../../actions/popup'
import { fetchExperts } from '../../actions/support'

import Experts from './generate/Experts'
import Customers from './generate/Customers'

import './support.scss';

const mapDispatchToProps = dispatch => {
    return {
        showCreateCustomerCumOrderPopup: () => dispatch(loadPopup('CreateCustomerCumOrder')),
        fetchExperts: () => dispatch(fetchExperts())
    }
}

class Generate extends React.Component {
    
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

export default connect(null, mapDispatchToProps)(Generate);