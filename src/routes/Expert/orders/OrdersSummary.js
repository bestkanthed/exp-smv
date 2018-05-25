import React from 'react';
import { Link } from 'react-router-dom';

const OrdersSummary = ({orders}) => (
    <div class="expert-orders row">
        {
            orders ?
            orders.map(order =>
                <Link to={'/expert/orders/'+order._id} key={order._id}>
                    <div>{JSON.stringify(order)}</div>
                    <div class='col-md-6 col-sm-12 col-lg-3'>
                        <p>{order.customer[0].name}</p>
                        <p>{order.noOfApplications}</p>
                        <p>{order.countries.map(country => country)}</p>
                        <p>{order.travelDate} - {order.status}</p>
                    </div>
                </Link>
            ) :
            <h2>Error connecting to the server</h2>
        }
    </div>
);

export default OrdersSummary;