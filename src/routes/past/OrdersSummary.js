import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { connect } from 'react-redux'
import '../Expert/order/ApplicationSummary.scss';

function BorderColor(status){
    switch(status){
        default: return "#c8c9cc";
    }
}

function prettyDate(date){
    return date ? date.substring(1,11) : null;
}

const mapStateToProps = state => ({
    user: state.user.user
})

const OrdersSummary = ({user, orders, idCustomer}) => (
    <div class="expert-orders row">
        {
            orders ?
            orders.map(order =>
                <div class='col-md-6 col-sm-12 col-lg-4' key={order._id}>
                    <Link style={{textDecoration:'none', color:'black'}}to={(idCustomer ? '/customer' : '/expert') + '/orders/'+order._id} >
                        <div class='mask-2 row' style={{borderRight:`solid 4px ${BorderColor(order.status)}`,padding:'5%'}}>
                            <div class='sub-mask row'>
                                <div class='col-lg-7 container-fluid'>
                                    {order.applications.length ? order.applications[0].name : null}  x{order.noOfApplications}<br/>
                                    {`${order.orderType} - ${order.country}`}
                                </div>
                                <div class='col-lg-4'>
                                Order Id: <br/> {order.orderCode}
                                </div>
                                <div class='col-lg-1' style={{backgroundColor:'#f44336', padding:'1%', borderRadius:'8px', color:'white'}}>
                                    {`${(order.notifications.filter(n => ( n.idFor === user._id && !n.seen ) )).length}`}
                                </div>
                            </div>
                            <br/>
                            <div class='sub-mask row'>
                                <div class='col-lg-7' style={{marginLeft:'3$'}}>
                                    Travel Date:<br/>
                                    {prettyDate(JSON.stringify(order.travelDate))}
                                </div>
                                <div class='col-lg-5'>
                                    Status:<br/> {order.status}
                                </div>
                                {/*
                                    supportCustomerView ? 
                                    <div class='col-lg-5'>
                                        {`Assigned to: ${ order.expert.length ? order.expert[0].name : null }`}
                                    </div> :
                                    null
                                */}
                            </div>
                        </div>
                    </Link>
                </div>
            ) :
            <h2>Error connecting to the server</h2>
        }
    </div>
);

export default connect(mapStateToProps)(OrdersSummary)