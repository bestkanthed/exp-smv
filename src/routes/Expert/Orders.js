import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { fetchOrders } from '../../actions/expert'

import OrdersSummary from './orders/OrdersSummary'
import OrderFilters from './orders/OrderFilters'

const mapStateToProps = state => ({
    expert: state.expert,
    user: state.user
})

const mapDispatchToProps = dispatch => ({ fetchOrders: idUser => dispatch(fetchOrders(idUser)) })

class Orders extends React.Component {
    
    componentWillMount() {
        let { user } = this.props.user;
        this.props.fetchOrders(user.id)
    }

    render() {
        let { orders } = this.props.expert.orders
        return (
            orders ?
            <div class='container expert'>
                <h1 style={{paddingTop : '32px'}}>Expert Dashboard</h1>
                <hr/>
                <OrderFilters />
                <OrdersSummary orders={orders} />
            </div> :
            <h2>Error connecting to the server</h2>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)