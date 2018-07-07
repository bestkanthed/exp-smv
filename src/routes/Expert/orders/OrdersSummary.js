import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { connect } from 'react-redux'
import '../order/ApplicationSummary.scss';

function BorderColor(status){
    switch(status){
        case "Complete": return "#1ddaae";
        case "Submitted": return "#2196f3";
        case "In Process": return "#ffc107";
        case "New": return"#f44336";
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

function prettyDate(date){
    return date ? date.substring(1,11) : null;
}

let mapStateToProps = state => ({
    supportCustomerView : state.expert.query.idCustomer,
    user: state.user.user
})

const OrdersSummary = ({user, orders, allowUpdate, idCustomer, supportCustomerView}) => (
    <div class="expert-orders row">
        {
            orders ?
            orders.map(order =>
                <div class='col-md-6 col-sm-12 col-lg-4' key={order._id}>
                    <Link style={{textDecoration:'none', color:'black'}} to={(idCustomer ? '/customer' : '/expert') + '/orders/'+order._id} >
                        <div class='mask-2 row' style={{borderRight:`solid 4px ${BorderColor(order.status)}`, padding:'5%'}}>
                            <div class='sub-mask row'>
                                <div class='col-lg-7 container-fluid'>
                                    {order.applications.length ? order.applications[0].name : null}  x{order.noOfApplications}<br/>
                                    {order.orderType}<br/>{order.country}
                                </div>
                                <div class='col-lg-4'>
                                Order Id: <br/> {order.orderCode}
                                </div>
                                {
                                    (order.notifications.filter(n => (n.idFor === user._id  && !n.seen) )).length ?
                                    <span style={{backgroundColor:'red', padding:'1%', borderRadius:'4px', color:'white'}}>
                                        {`${(order.notifications.filter(n => (n.idFor === user._id  && !n.seen) )).length}`}
                                    </span> :
                                    null
                                }
                            </div>
                            <br/>
                            <div class='sub-mask row'>
                                <div class='col-lg-7'>
                                    Travel Date:<br/>
                                    {prettyDate(JSON.stringify(order.travelDate))}
                                </div>
                                <div class='col-lg-5'>
                                    Status:<br/> {order.status}
                                </div>
                                {
                                    supportCustomerView ? 
                                    <div class='col-lg-5'>
                                        {`Assigned to: ${ order.expert.length ? order.expert[0].name : null }`}
                                    </div> :
                                    null
                                }
                            </div>
                        </div>
                    </Link>
                    {
                        allowUpdate ?
                        <Link to={'/expert/orders/'+order._id+'?supportView=true'}> Update </Link> :
                        null
                    }
                </div>
            ) :
            <h2>Error connecting to the server</h2>
        }
    </div>
);

export default connect(mapStateToProps)(OrdersSummary)