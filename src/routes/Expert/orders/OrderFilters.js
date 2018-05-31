import React from 'react';
import { connect } from 'react-redux'

import { fetchOrders } from '../../../actions/expert';

const mapStateToProps = state => ({
    countries: state.database.countries
})

const mapDispatchToProps = dispatch => ({
    fetchOrders: query => dispatch(fetchOrders(query))
})

const OrderFilters = ({idExpert, fetchOrders, countries}) => (
    <div class="col-md-12 col-lg-12 col-sm-12">
        <label>Sort by : Status</label><select defaultValue={'All'} onChange={event => {
            let status = event.target.value === 'All' ? null : 'status='+event.target.value
            if(idExpert) fetchOrders('idExpert='+idExpert+'&'+status)
            else fetchOrders(status)
        }}>
            <option value='All'>All</option>
            <option value='New'>New</option>
            <option value='In Process'>In Process</option>
            <option value='Submitted'>Submitted</option>
            <option value='Completed'>Completed</option>
        </select>
        <label>Country</label><select defaultValue={'All'} onChange={event => {
            let country = event.target.value === 'All' ? null : 'country='+event.target.value
            if(idExpert) fetchOrders('idExpert='+idExpert+'&'+country)
            else fetchOrders(country)
        }}>
            <option value='All'>All</option>
            {countries.countries ? countries.countries.map(country => 
                <option value={country.name} key={country._id}> {country.name} </option> 
            ) : null}
        </select>
    </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(OrderFilters)