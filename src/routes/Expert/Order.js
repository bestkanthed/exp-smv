import React from 'react'
import { NavLink as Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchOrder, fetchLinkedOrders, linkedOrderClicked, setQuery } from '../../actions/expert'

import OrderUpdate from './order/OrderUpdate'
import ApplicationsSummary from './order/ApplicationsSummary'

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
})

function BorderColor(status){
    switch(status){
        case "Complete": return "#1ddaae";
        case "Submitted": return "#2196f3";
        case "In Process": return "#ffc107";
        case "New Application": return"#f44336";
        case 'Pickup Scheduled': return '#ffc107';
        case 'Under Review': return '#ffc107';
        case 'Ready To Submit': return '#ffc107';
        case 'Application Pack Couriered': return '#ffc107';
        case 'Collected': return '#2196f3';
        case 'Delivered': return '#2196f3';
        case 'Decision Made': return '#2196f3';
        default: return "#ffffff";
    }
}

class Order extends React.Component {
    
    componentWillMount() {
        let { fetchOrder, idOrder, fetchLinkedOrders } = this.props
        fetchOrder(idOrder)
        fetchLinkedOrders(idOrder)
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
                            <Link to={idCustomer ? '/customer/orders' : supportView ? '/expert/orders+idExpert='+order.idExpert : '/expert/orders'}> Home </Link>
                            >
                            <Link to={idCustomer ? '/customer/orders' : supportView ? '/expert/orders+idExpert='+order.idExpert : '/expert/orders'} onClick={() => {if (!idCustomer) setQuery({ orderType: order.orderType }) }}> {order.orderType} </Link>
                            >
                            {order.customer.length ? order.customer[0].name : null}

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
                                                <Link to={'/expert/orders/'+linkedOrder._id} onClick={() => linkedOrderClicked() } >Assigned to You : {linkedOrder.country}</Link> :
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
                        <hr/>
                        <div>
                        <div class='mask row' style={{borderRight:`6px solid ${BorderColor(order.applications.length ? order.applications[0].status : 'Past')}`}}>
                            <div class='col-lg-1' style={{padding:'2%'}}>
                                <Link to={idCustomer ? '/customer/orders' : '/expert/orders'}><img src='../../../images/ic/arrow_back/grey600.png'/></Link>
                            </div>
                            {order.applications.length ? <div class='col-lg-2 col-md-2'  style={{borderLeft:'1px solid #e0e0e0',padding:'2%'}}>
                                <p>{order.applications[0].name}</p>
                                <p>{order.applications[0].country} - {order.applications[0].visaType}</p>
                            </div> : null}
                            <div style={{padding:'2%'}} class='col-lg-2 col-md-3'>
                            <p>Order Id : <br/>{order.orderCode}</p>
                            </div>
                            <div class='col-lg-2 col-md-3' style={{padding:'2%'}}>
                            <p>Status :</p><p>{order.status}</p>
                            </div>
                            <div class='col-lg-2 col-md-3' style={{padding:'2%'}}>
                            <p>Invoice No :</p><p>{order.invoiceNo}</p>
                            </div>
                        </div>
                        </div>
                        <br/>
                        <div style={{overflowY:'scroll', height:idCustomer ? '65vh':'500px'}}>
                        <ApplicationsSummary idCustomer={idCustomer} applications={order.applications} />
                        </div>
                    </div> :
                    null :
                    <div> Loading </div>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)