import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import '../order/ApplicationSummary.scss';

function BorderColor(status){
    switch(status){
        case "Complete": return "#1ddaae";
        case "Submitted": return "#1ddaae";
        case "In Process": return "#ffc107";
        case "Ready to Submit": return 'purple';
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

function prettyDate(date){
    return date ? date.substring(1,11) : null;
}

const OrdersSummary = ({orders, allowUpdate, idCustomer}) => (
    <div class="expert-orders row">
        {
            orders ?
            orders.map(order =>
                <div class='col-md-6 col-sm-12 col-lg-4' key={order._id}>
                    {console.log("this is the order object", order)}
                    <Link style={{textDecoration:'none', color:'black'}}to={(idCustomer ? '/customer' : '/expert') + '/orders/'+order._id} >
                        <div class='mask row' style={{borderRight:`solid 4px ${BorderColor(order.status)}`,padding:'5%'}}>
                            <div class='sub-mask row'>
                                <div class='col-lg-7 container-fluid'>
                                    {order.customer[0] ? order.customer[0].name : null }  x{order.noOfApplications}<br/>
                                    {`${order.orderType}-${order.country}`}
                                </div>
                                <div class='col-lg-4'>
                                    {`Order Id:
                                    SVGA1234`}
                                </div>
                                <div class='col-lg-1' style={{backgroundColor:'#f44336', padding:'1%', borderRadius:'8px', color:'white'}}>
                                    {`${2}`}
                                </div>
                            </div>
                            <br/>
                            <div class='sub-mask row'>
                                <div class='col-lg-7'>
                                    {`Travel Date:
                                    ${prettyDate(JSON.stringify(order.travelDate))}`}
                                </div>
                                <div class='col-lg-5'>
                                    {`Satus: ${order.status}`}
                                </div>
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

export default OrdersSummary;