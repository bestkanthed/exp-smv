import React from 'react'
import {NavLink as Link} from 'react-router-dom'
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

function BorderColor(status){
    switch(status){
        case "Complete": return "#1ddaae";
        case "Submitted": return "#1ddaae";
        case "In Process": return "#ffc107";
        case "New": return"#f44336";
        case 'Pickup Scheduled': return '#ffc107';
        case 'Under Review': return '#ffc107';
        case 'Ready To Submit': return '#ffc107';
        case 'Application Pack Couriered': return '#ffc107';
        case 'Collected': return '#1ddaae';
        case 'Delivered': return '#1ddaae';
        case 'Decision Made': return '#1ddaae';
        default: return "#ffffff";
    }
}

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
                        <hr/>
                        <h4>Existing Applications</h4>
                        {idCustomer ? null : <OrderUpdate supportView={supportView} order={order}/>}
                        <hr/>
                        <div>
                        <div class='mask row' style={{borderRight:`6px solid ${BorderColor(order.applications[0].status)}`}}>
                            <div class='col-lg-1' style={{padding:'2%'}}>
                                <Link to={idCustomer ? '/customer/orders' : '/expert/orders'}><img src='../../../images/ic/arrow_back/grey600.png'/></Link>
                            </div>
                            <div class='col-lg-2 col-md-2'  style={{borderLeft:'1px solid #e0e0e0',padding:'2%'}}>
                                <p>{order.applications[0].name}</p>
                                <p>{order.applications[0].country} - {order.applications[0].visaType}</p>
                            </div>
                            <div style={{padding:'2%'}} class='col-lg-2 col-md-3'>
                            <p>Travel Date : <br/>{order.applications[0].travelDate ? order.applications[0].travelDate.substring(0, 10) : null}</p>
                            </div>
                            <div class='col-lg-2 col-md-3' style={{padding:'2%'}}>
                            <p>Employment Status :</p><p>{order.applications[0].employmentStatus}</p>
                            </div>
                            <div class='col-lg-2 col-md-3' style={{padding:'2%'}}>
                            <p>Submission Date :</p><p>{order.applications[0].submissionDate ? order.applications[0].submissionDate.substring(0, 10) : null}</p>
                            </div>
                            <div class='col-lg-2 col-md-3' style={{padding:'2%'}}>
                            <p>Status:</p><p>{order.applications[0].status}</p>
                            </div>
                        </div>
                        </div>
                        <br/>
                        <div style={{overflowY:'scroll', height:idCustomer ? '65vh':'500px'}}>
                        {console.log('-------########--------',supportView)}
                        <ApplicationsSummary idCustomer={idCustomer} applications={order.applications} />
                        </div>
                        {/* {idCustomer ? null : <ApplicationAdd idOrder={order._id} />}  */}
                    </div> :
                    null :
                    <div> Loading </div>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)