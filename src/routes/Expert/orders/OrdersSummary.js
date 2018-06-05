import React from 'react';
import { Link } from 'react-router-dom';
import '../order/ApplicationSummary.scss';

function BorderColor(status){
    switch(status){
        case "Complete": return "#2196f3";
        case "Submitted": return "#00bcd4";
        case "In Process": return "#ffc107";
        case "New": return"#f44336";
        default: return "#ffffff";
    }
}

function prettyDate(date){
    return date ? date.substring(1,11) : null;
}

const OrdersSummary = ({orders, allowUpdate}) => (
    <div class="expert-orders row">
        {
            orders ?
            orders.map(order =>
                <div class='col-md-6 col-sm-12 col-lg-3' key={order._id}>
                    {console.log("this is the order object", order)}
                    <Link to={'/expert/orders/'+order._id} >
                        <div class='mask row' style={{borderRight:`solid 4px ${BorderColor(order.status)}`}}>
                            <div class='sub-mask row'>
                                <div class='col-lg-7'>
                                    {order.customer[0] ? order.customer[0].name : null }  x{order.noOfApplications}<br/>
                                    {order.orderType}
                                </div>
                                <div class='col-lg-4'>
                                    {`Order Id:
                                    SVGA1234`}
                                </div>
                                <div>
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