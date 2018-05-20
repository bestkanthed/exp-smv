import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { fetchOrder } from '../../actions/expert'

import ApplicationsSummary from './order/ApplicationsSummary'

const mapStateToProps = state => ({
    expert: state.expert,
    user: state.user
})

const mapDispatchToProps = dispatch => ({ fetchOrder: idOrder => dispatch(fetchOrder(idOrder)) })

class Order extends React.Component {
    
    componentWillMount() {
        let { fetchOrder, idOrder } = this.props
        fetchOrder(idOrder)
    }

    render() {
        let { order } = this.props.expert.order
        return (
            order ?
            <div class='container expert'>
                <h1 style={{paddingTop : '32px'}}>Order</h1>
                <hr/>
                <ApplicationsSummary applications={order.applications} />
            </div> :
            <h2>Error connecting to the server</h2>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)