import React from 'react';
import { fetchOrders } from '../../../actions/expert';

/**
 * The selection will fire an action that will fire a specific query that will change the orders in the state
 */

const OrderFilters = ({idExpert}) => (
    <div class="col-md-12 col-lg-12 col-sm-12">
        <label>Status :</label><select defaultValue={status} onChange={event => {
            let query = event.target.value
            fetchOrders(idExpert)
            }}>
            <option value='To be Reviewed'>To be Reviewed</option>            
            <option value='Pickup Scheduled'>Pickup Scheduled</option>
            <option value='Ready to Submit'>Ready to Submit</option>
            <option value='Reviewed: NOT OKAY'>Reviewed: NOT OKAY</option>
            <option value='Submitted'>Submitted</option>
        </select>
        <ul><li>Country</li></ul>
    </div>
);

export default OrderFilters;