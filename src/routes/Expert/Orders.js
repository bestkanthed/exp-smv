import React from 'react'
import { connect } from 'react-redux'

import { fetchOrders } from '../../actions/expert'

import OrdersSummary from './orders/OrdersSummary'
import OrderFilters from './orders/OrderFilters'

const mapStateToProps = state => ({
    orders: state.expert.orders,
    query: state.expert.query
})

const mapDispatchToProps = dispatch => ({ fetchOrders: query => dispatch(fetchOrders(query)) })

const serialize = object => {
    let query = ""
    for (let property in object) {
        if (object[property] && object[property]!=='All') query = query.concat(property, '=', object[property], '&')
    }
    return query
}

class Orders extends React.Component {
    
    componentWillMount() {
        let { fetchOrders, query } = this.props
        fetchOrders(serialize(query))
    }

    render() {
        let { idExpert, idCustomer } = this.props
        let { orders, fetching, fetched } = this.props.orders
        return (
            <div class='container-fluid expert'>
                <div>
                     <OrderFilters idCustomer={idCustomer} idExpert={idExpert} />
                    {
                        fetching ?
                        null :
                        fetched ?
                        orders ?
                        <div>
                            <hr/>
                            <OrdersSummary orders={orders} idCustomer={idCustomer} allowUpdate={idExpert ? true : false}/>
                        </div>:
                        null :
                        null
                    }
            </div>
            </div> 
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)