import React from 'react'
import { connect } from 'react-redux'

import { fetchOrders } from '../actions/expert'

import OrderFilters from './past/OrderFilters'
import OrdersSummary from './past/OrdersSummary'

const mapStateToProps = state => ({
    orders: state.expert.orders,
    user: state.user
})

const mapDispatchToProps = dispatch => ({ fetchOrders: query => dispatch(fetchOrders(query)) })

const serialize = object => {
    let query = ""
    for (let property in object) {
        if (object[property] && object[property]!=='All') query = query.concat(property, '=', object[property], '&')
    }
    return query
}

class Past extends React.Component {

    componentWillMount() {
        let { fetchOrders } = this.props
        fetchOrders(serialize({status: 'Past'}))
    }

    render() {
        let { user } = this.props.user
        let { orders, fetching, fetched } = this.props.orders
        let idCustomer = user ? user.teams.indexOf('customer') !== -1 ? user._id : undefined : undefined
        return (
            <div class='container-fluid expert'>
                <div>
                    {
                        user ?
                        user.teams.indexOf('customer') !== -1 ?
                        <h4> Past Applications </h4> :
                        <OrderFilters /> :
                        null
                    }
                    {
                        fetching ?
                        null :
                        fetched ?
                        orders ?
                        <div>
                        <hr/>
                        <OrdersSummary orders={orders} idCustomer={idCustomer} />
                        </div>:
                        null :
                        null
                    }
            </div>
            </div> 
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Past)