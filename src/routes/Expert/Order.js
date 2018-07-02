import React from 'react'
import { NavLink as Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchOrder, fetchLinkedOrders, linkedOrderClicked, setQuery, setActiveTab } from '../../actions/expert'

import OrderUpdate from './order/OrderUpdate'
import ApplicationsSummary from './order/ApplicationsSummary'
import OrderDescription from './order/OrderDescription'

const mapStateToProps = state => ({
    order: state.expert.order,
    user: state.user.user,
    linkedOrders : state.expert.linkedOrders
})

const mapDispatchToProps = dispatch => ({
    fetchOrder: idOrder => dispatch(fetchOrder(idOrder)),
    fetchLinkedOrders: idOrder => dispatch(fetchLinkedOrders(idOrder)),
    linkedOrderClicked: () => dispatch(linkedOrderClicked()),
    setQuery: query => dispatch(setQuery(query)),
    setActiveTab: index => dispatch(setActiveTab(index))
})

class Order extends React.Component {
    
    componentWillMount() {
        let { fetchOrder, idOrder, fetchLinkedOrders, setActiveTab } = this.props
        fetchOrder(idOrder)
        fetchLinkedOrders(idOrder)
        setActiveTab(0)
    }

    render() {
        let { order, fetching, fetched, rerender } = this.props.order
        let { linkedOrders } = this.props.linkedOrders
        let { fetchOrder, idOrder, supportView, idCustomer, user, linkedOrderClicked, setQuery } = this.props
        if(rerender) fetchOrder(idOrder)
        
        return (
            <div class='expert'>
                {
                    fetching ?
                    null :
                    fetched ?
                    order ?
                    <div>
                        <h4>
                            <Link to={idCustomer ? '/customer/orders' : supportView ? '/expert/orders+idExpert='+order.idExpert : '/expert/orders'}>Home</Link>
                            <span>{' '}<img src='/images/ic/ic/ic_chevron_right_24px.png' />{' '}</span>
                            {order.applications.length ? order.applications[0].name : null}x{order.noOfApplications}
                        </h4>
                        <OrderDescription linkedOrders={linkedOrders} order={order} idCustomer={idCustomer}/>
                        <br/>
                        <ApplicationsSummary idCustomer={idCustomer} applications={order.applications} />
                        <br/>
                        {idCustomer ? null : <OrderUpdate supportView={supportView} order={order}/>}
                    </div> :
                    null :
                    <div> Loading </div>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)