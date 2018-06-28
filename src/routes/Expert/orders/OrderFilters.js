import React from 'react';
import { connect } from 'react-redux'

import { fetchOrders, setQuery } from '../../../actions/expert';

import './OrderFilter.scss';

const orderTypes = [
    'Pickup Drop',
    'Online Consultation',
    'eVisa'
]

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

    setQueryFilters() {
        switch(this.props.query){
            case '' : return 
        }
    }
    

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
        let pd, oc, ev
        return (
            <div>
                {
                    idCustomer ?
                    <div>
                        Orders:
                    </div> :
                    <div>
                        <div class="col-md-12 col-lg-12 col-sm-12" style={{marginBottom:'2%'}}>
                            {
                                orderTypes.map(orderType =>  (
                                <div key={orderType} class={`filter-mask ${query.orderType===orderType? 'selectedFilter':''}`} onClick={()=>{handleServiceTypeChange(orderType)}}>
                                    {orderType}
                                </div>
                            ))
                            }
                            {/* <div class='filter-mask' onClick={(event)=>{handleServiceTypeChange('Pickup Drop');}}>
                                Pickup Drop
                            </div>
                            <div class={`filter-mask ${query.orderType==='Online Consul'}`} onClick={()=>handleServiceTypeChange('Online Consultation')}>
                                Online Consultation
                            </div>
                            <div class='filter-mask' onClick={(event)=>{handleServiceTypeChange('eVisa'); query.orderType==='eVisa'? event.target.style.backgroundColor='red':null}}>
                                eVisa
                            </div> */}
                        </div>
                        <div>
                            Status:
                            <div class='status-filter-mask status-filter-mask-active' style={{fontSize:'8px'}} onClick={() => handleStatusTypeChange('All')}>
                                All
                            </div>
                            <div class='status-filter-mask status-filter-mask-active' style={{fontSize:'8px'}} onClick={() => handleStatusTypeChange('Active')}>
                                Active
                            </div>
                            <div class='status-filter-mask status-filter-mask-new' onClick={() => handleStatusTypeChange('New')}>
                                New
                            </div>
                            <div class='status-filter-mask status-filter-mask-in-process'onClick={() => handleStatusTypeChange('In Process')}>
                                In Process
                            </div>
                            <div class='status-filter-mask status-filter-mask-submitted'onClick={()=>handleStatusTypeChange('Submitted')}>
                                Submitted
                            </div>
                            <div class='status-filter-mask status-filter-mask-completed' onClick={()=>handleStatusTypeChange('Complete')}>
                                Completed
                            </div>
                            <label style={{marginLeft:'2%'}}>Country:</label><select style={{ backgroundColor:'white', border:'none', maxWidth:'15%'}} defaultValue={query.country} onChange={event => {
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