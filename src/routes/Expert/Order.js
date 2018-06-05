import React from 'react'
import { connect } from 'react-redux'

import { fetchOrder } from '../../actions/expert'

import OrderUpdate from './order/OrderUpdate'
import ApplicationsSummary from './order/ApplicationsSummary'
import ApplicationAdd from './order/ApplicationAdd'

const mapStateToProps = state => ({
    order: state.expert.order,
    user: state.user
})

const mapDispatchToProps = dispatch => ({ fetchOrder: idOrder => dispatch(fetchOrder(idOrder)) })

class Order extends React.Component {
    
    componentWillMount() {
        let { fetchOrder, idOrder } = this.props
        fetchOrder(idOrder)
    }

    render() {
        let { order, fetching, fetched, rerender } = this.props.order
        let { fetchOrder, idOrder, supportView, idCustomer } = this.props
        if(rerender) fetchOrder(idOrder)
        
        return (
            <div class='container expert'>
                {
                    fetching ?
                    null :
                    fetched ?
                    order ?
                    <div>
                        <h3>Order : {order.country}</h3>
                        <hr/>
                        <h4>Exesting Applications</h4>
                        {idCustomer ? null : <OrderUpdate supportView={supportView} order={order}/>}
                        <ApplicationsSummary idCustomer={idCustomer} applications={order.applications} />
                        {idCustomer ? null : <ApplicationAdd idOrder={order._id} />}
                    </div> :
                    null :
                    <div> Loading </div>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)