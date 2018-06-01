import React from 'react';
import { connect } from 'react-redux'

import { fetchOrders } from '../../../actions/expert';

const mapStateToProps = state => ({
    countries: state.database.countries
})

const mapDispatchToProps = dispatch => ({
    fetchOrders: query => dispatch(fetchOrders(query))
})

const serialize = object => {
    let query = ""
    for (let property in object) {
        if (object[property] && object[property]!=='All') query = query.concat(property, '=', object[property], '&')
    }
    return query
  }

const OrderFilters = ({idExpert, fetchOrders, countries}) => {
    
    let query = {
        idExpert,
        orderType : null,
        status: null,
        country: null
    }

    return (
        <div class="col-md-12 col-lg-12 col-sm-12">
            <label>Sort by : Order Type</label><select defaultValue={undefined} onChange={event => {
                query.orderType = event.target.value
                fetchOrders(serialize(query))
            }}>
                <option value='All'>All</option>
                <option value='Pickup Drop'>Pickup Drop</option>
                <option value='Online Consultation'>Online Consultation</option>
                <option value='eVisa'>eVisa</option>
            </select>
            <label>Status</label><select defaultValue='All' onChange={event => {
                query.status = event.target.value
                fetchOrders(serialize(query))
            }}>
                <option value='All'>All</option>
                <option value='New'>New</option>
                <option value='In Process'>In Process</option>
                <option value='Submitted'>Submitted</option>
                <option value='Complete'>Complete</option>
            </select>
            <label>Country</label><select defaultValue='All' onChange={event => {
                query.country = event.target.value
                fetchOrders(serialize(query))
            }}>
                <option value='All'>All</option>
                {countries.countries ? countries.countries.map(country => 
                    <option value={country.name} key={country._id}> {country.name} </option> 
                ) : null}
            </select>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderFilters)