import React from 'react'
import { connect } from 'react-redux'

import { fetchOrders } from '../../actions/expert'

import OrdersSummary from './orders/OrdersSummary'
import OrderFilters from './orders/OrderFilters'

const mapStateToProps = state => ({ orders: state.expert.orders })

const mapDispatchToProps = dispatch => ({ fetchOrders: idUser => dispatch(fetchOrders(idUser)) })

class Orders extends React.Component {
    
    componentWillMount() {
        let { idExpert, fetchOrders } = this.props
        if(idExpert) fetchOrders(idExpert)
        else fetchOrders(null)
    }

    render() {
        let { idExpert } = this.props
        let { orders, fetching, fetched } = this.props.orders
        return (
            <div class='container expert'>
                <h1>Expert Dashboard</h1>
                <hr/>
                <OrderFilters />
                {
                    fetching ?
                    null :
                    fetched ?
                    orders ?
                    <OrdersSummary orders={orders} allowUpdate={idExpert ? true : false}/> :
                    null :
                    null
                }
            </div> 
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)