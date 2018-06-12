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
            <div class="container support">
                <div>
                    <br/><br/>
                    <button class='button-mask' onClick={this.props.showCreateCustomerCumOrderPopup}>
                        Create Order
                    </button>
                    <button class='button-mask' style={{marginLeft:'2%'}}>
                        Change Visa Expert
                    </button>
                    <button class='button-mask' style={{marginLeft:'2%'}}>
                        <Link to='/support/new'>New Orders</Link>
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

export default connect(null, mapDispatchToProps)(Generate);