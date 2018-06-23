import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchCustomers } from '../../../actions/support'

import '../support.scss';

const mapStateToProps = state => ({
    customers: state.support.customers
})

const mapDispatchToProps = dispatch => ({ fetchCustomers: () => dispatch(fetchCustomers()) })

class Customers extends React.Component {
    
    componentWillMount() {
        this.props.fetchCustomers()
    }

    render() {
        let { customers, fetching, fetched } = this.props.customers
        return (
            fetched ?
            customers ?
            <div class='row'>
                {
                    customers.map(customer =>        
                            <Link key={customer._id} to={'/customer/orders?idCustomer='+customer._id}>
                                <div class='col-lg-2 col-md-4 col-sm-12 mask'>
                                <p>{customer.name}</p>
                                <p>Ongoing Orders</p>
                                <span style={{paddingLeft:'15%'}}>{customer.onGoingOrders}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Customers)