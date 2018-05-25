import React from 'react'
import { connect } from 'react-redux'

import { fetchOrders } from '../../actions/expert'

import OrdersSummary from './orders/OrdersSummary'
import OrderFilters from './orders/OrderFilters'

const mapStateToProps = state => ({
    orders: state.expert.orders,
    user: state.user
})

const mapDispatchToProps = dispatch => ({ fetchOrders: idUser => dispatch(fetchOrders(idUser)) })

class Orders extends React.Component {
    
    componentWillMount() {
        let { user } = this.props.user;
        this.props.fetchOrders(user.id)
    }

    render() {
        let orders = this.props.orders
        return (
            <div class='container expert'>
                <h1>Expert Dashboard</h1>
                <hr/>
                <OrderFilters />
                {
                    orders.fetching ?
                    null :
                    orders.fetched ?
                    orders.orders ?
                    <OrdersSummary orders={orders.orders} /> :
                    null :
                    null
                }
            </div> 
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)