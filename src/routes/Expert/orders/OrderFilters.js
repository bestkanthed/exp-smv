import React from 'react';
import { connect } from 'react-redux'

import { fetchOrders } from '../../../actions/expert';

const mapDispatchToProps = dispatch => ({
    fetchOrders: query => dispatch(fetchOrders(query))
})

const OrderFilters = ({idExpert, fetchOrders}) => (
    <div class="col-md-12 col-lg-12 col-sm-12">
        <label>Status :</label><select defaultValue={status} onChange={event => {
            if(idExpert) fetchOrders('idExpert='+idExpert+'&status='+event.target.value)
            else fetchOrders('status='+event.target.value)
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

export default connect(null, mapDispatchToProps)(OrderFilters)