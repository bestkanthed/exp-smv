import React from 'react'
import { connect } from 'react-redux'

import { fetchOrders } from '../../actions/expert'

import OrdersSummary from './orders/OrdersSummary'
import OrderFilters from './orders/OrderFilters'

const mapStateToProps = state => ({ orders: state.expert.orders })

const mapDispatchToProps = dispatch => ({ fetchOrders: query => dispatch(fetchOrders(query)) })

class Orders extends React.Component {
    
    componentWillMount() {
        let { idExpert, fetchOrders } = this.props
        if(idExpert) fetchOrders('idExpert='+idExpert)
        else fetchOrders(null)
    }

    render() {
        let { idExpert, idCustomer } = this.props
        let { orders, fetching, fetched } = this.props.orders
        return (
            <div class='container expert'>
                { idCustomer ? <h1>Your Orders</h1> : <h1>Expert Dashboard</h1> }
                <hr/>
                <OrderFilters idExpert={idExpert} />
                {
                    fetching ?
                    null :
                    fetched ?
                    orders ?
                    <OrdersSummary orders={orders} idCustomer={idCustomer} allowUpdate={idExpert ? true : false}/> :
                    null :
                    null
                }
            </div> 
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)