import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchOrder, fetchLinkedOrders } from '../../actions/expert'

import OrderUpdate from './order/OrderUpdate'
import ApplicationsSummary from './order/ApplicationsSummary'
import ApplicationAdd from './order/ApplicationAdd'

const mapStateToProps = state => ({
    order: state.expert.order,
    user: state.user.user,
    linkedOrders : state.expert.linkedOrders
})

const mapDispatchToProps = dispatch => ({
    fetchOrder: idOrder => dispatch(fetchOrder(idOrder)),
    fetchLinkedOrders: idOrder => dispatch(fetchLinkedOrders(idOrder)),
})

class Order extends React.Component {
    
    componentWillMount() {
        let { fetchOrder, idOrder, fetchLinkedOrders } = this.props
        fetchOrder(idOrder)
        fetchLinkedOrders(idOrder)
    }

    render() {
        let { order, fetching, fetched, rerender } = this.props.order
        let { linkedOrders } = this.props.linkedOrders
        let { fetchOrder, idOrder, supportView, idCustomer, user } = this.props
        if(rerender) fetchOrder(idOrder)
        
        return (
            <div class='container expert'>
                {
                    fetching ?
                    null :
                    fetched ?
                    order ?
                    <div>
                        <h4>
                            {/*<Link to={idCustomer ? '/customer/orders' : supportView ? '/expert/orders+idExpert='+order.idExpert : '/expert/orders'}> Home </Link>*/}
                            Home > {order.orderType} > {order.customer.length ? order.customer[0].name : null}
                        </h4>
                        {
                            linkedOrders ?
                            linkedOrders.length ?
                            <ul class='linked-orders'>
                                {
                                    linkedOrders.map((linkedOrder, index) =>
                                        <li key={index}>
                                            {
                                                linkedOrder.idExpert === user._id ?
                                                <Link to={'/expert/orders/'+linkedOrder._id}>Assigned to You : {linkedOrder.country}</Link> :
                                                <div> Assigned to {linkedOrder.expert[0] ? linkedOrder.expert[0].name : null} : {linkedOrder.country} </div>
                                            }
                                        </li>
                                    )
                                }
                            </ul> :
                            <div> No ongoing linked orders </div>
                            :null
                        }
                        <hr/>
                        <h4>Existing Applications</h4>
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