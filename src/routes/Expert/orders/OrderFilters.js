import React from 'react';
import { connect } from 'react-redux'

import { fetchOrders, setQuery } from '../../../actions/expert';

import './OrderFilter.scss';

const mapStateToProps = state => ({
    countries: state.database.countries,
    query: state.expert.query
})

const mapDispatchToProps = dispatch => ({
    fetchOrders: query => dispatch(fetchOrders(query)),
    setQuery: query => dispatch(setQuery(query)),    
})

const serialize = object => {
    let query = ""
    for (let property in object) {
        if (object[property] && object[property]!=='All') query = query.concat(property, '=', object[property], '&')
    }
    
    return query;
}

class OrderFilters extends React.Component {

    render () {
        let { idExpert, idCustomer, fetchOrders, countries, query, setQuery } = this.props
        function handleServiceTypeChange(service){
            setQuery({ orderType: service })
            fetchOrders(serialize({...query, orderType: service}));
        }
    
        function handleStatusTypeChange(status){
            setQuery({ status })
            fetchOrders(serialize({...query, status}));
        }

        return (
            <div>
                {
                    idCustomer ?
                    <div>
                        Orders:
                    </div> :
                    <div>
                        <div class="col-md-12 col-lg-12 col-sm-12" style={{marginBottom:'2%'}}>
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
                        <div>
                            Status:
                            <div class='status-filter-mask ' style={{fontSize:'8px'}} onClick={() => handleStatusTypeChange('All')}>
                                All
                            </div>
                            <div class='status-filter-mask ' style={{fontSize:'8px'}} onClick={() => handleStatusTypeChange('Active')}>
                                Active
                            </div>
                            <div class='status-filter-mask' style={{backgroundColor:'#f44336', fontSize:'8px'}}onClick={() => handleStatusTypeChange('New')}>
                                New
                            </div>
                            <div  style={{backgroundColor:'#ffc107', fontSize:'8px'}} class='status-filter-mask 'onClick={() => handleStatusTypeChange('In Process')}>
                                In Process
                            </div>
                            <div style={{backgroundColor:'#2196f3', fontSize:'8px'}} class='status-filter-mask 'onClick={()=>handleStatusTypeChange('Submitted')}>
                                Submitted
                            </div>
                            <div style={{backgroundColor:'#1ddaae', fontSize:'8px'}} class='status-filter-mask ' onClick={()=>handleStatusTypeChange('Complete')}>
                                Completed
                            </div>
                            <label style={{marginLeft:'2%'}}>Country</label><select defaultValue={query.country} onChange={event => {
                                setQuery({ country : event.target.value })
                                fetchOrders(serialize({...query, country : event.target.value}))
                            }}>
                                <option value='All'>All</option>
                                {countries.countries ? countries.countries.map(country => 
                                    <option value={country.name} key={country._id}> {country.name} </option> 
                                ) : null}
                            </select>
                        </div>
                    </div>
                }
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(OrderFilters)