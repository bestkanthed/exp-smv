import React from 'react';
import { Link } from 'react-router-dom';

const OrdersSummary = ({orders, allowUpdate}) => (
    <div class="expert-orders row">
        {
            orders ?
            orders.map(order =>
                <div class='col-md-6 col-sm-12 col-lg-3' key={order._id}>
                    <Link to={'/expert/orders/'+order._id} >
                        <p>{JSON.stringify(order.customer)}</p>
                        <p>{order.noOfApplications}</p>
                        <p>{order.countries.map(country => country)}</p>
                        <p>{order.travelDate} - {order.status}</p>
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