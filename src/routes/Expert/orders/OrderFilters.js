import React from 'react';
import { connect } from 'react-redux'

import { fetchOrders } from '../../../actions/expert';

import './OrderFilter.scss';

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

function handleServiceTypeChange(service, selectedFilter){
    query.orderType=service;
    fetchOrders(serialize(query));
}

function handleStatusTypeChange(status){
    query.status=status;
    fetchOrders(serialize(query));
}
    return (
        <div>
        <div class="col-md-12 col-lg-12 col-sm-12" style={{margin:'1%'}}>
            <div class='filter-mask' onClick={()=>{handleServiceTypeChange('All')}}>
                All
            </div>
            <div  class='filter-mask' onClick={()=>handleServiceTypeChange('Pickup Drop')}>
                Pickup Drop
            </div>
            <div class='filter-mask' onClick={()=>handleServiceTypeChange('Online Consultation')}>
                Online Consulatation
            </div>
            <div class='filter-mask' onClick={()=>handleServiceTypeChange('eVisa')}>
                eVisa
            </div>
        </div>
        <div style={{paddingLeft:'3%'}}>
            sort by status:
            <div class='status-filter-mask 'onClick={handleStatusTypeChange('All')}>
                All
            </div>
            <div class='status-filter-mask 'onClick={()=>handleStatusTypeChange('New')}>
                New
            </div>
            <div  style={{backgroundColor:'#ffc107'}} class='status-filter-mask 'onClick={()=>handleStatusTypeChange('In Process')}>
                
            </div>
            <div style={{backgroundColor:'#00bcd4'}} class='status-filter-mask 'onClick={()=>handleStatusTypeChange('Submitted')}>
                
            </div>
            <div style={{backgroundColor:'#2196f3'}} class='status-filter-mask ' onClick={()=>handleStatusTypeChange('Complete')}>
            </div>
            <label style={{marginLeft:'2%', marginRight:'2%'}}>Country</label><select defaultValue='All' onChange={event => {
                query.country = event.target.value
                fetchOrders(serialize(query))
            }}>
                <option value='All'>All</option>
                {countries.countries ? countries.countries.map(country => 
                    <option value={country.name} key={country._id}> {country.name} </option> 
                ) : null}
            </select>
        </div> 
    </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderFilters)