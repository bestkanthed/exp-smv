import React from 'react';
import { connect } from 'react-redux'

import { fetchOrders } from '../../actions/expert';

import '../Expert/orders/OrderFilter.scss';

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
    return query;
}

class OrderFilters extends React.Component {
    render () {
        let { fetchOrders, countries} = this.props
        let country, travelStart, travelEnd
        return (
            <div>
                <div>
                    <label style={{marginLeft:'2%'}}>Country</label> <select ref = {node => { country = node }}>
                        <option value='All'>All</option>
                        {countries.countries ? countries.countries.map(country => 
                            <option value={country.name} key={country._id}> {country.name} </option> 
                        ) : null}
                    </select>
                    Start : <input type='date' ref = {node => { travelStart = node }}/>
                    End : <input type='date' ref = {node => { travelEnd = node }}/>
                    <button onClick={ () => fetchOrders(serialize({
                        status: 'Past',
                        country : country.value,
                        travelStart: travelStart.value,
                        travelEnd: travelEnd.value,
                    })) }> Filter </button>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderFilters)