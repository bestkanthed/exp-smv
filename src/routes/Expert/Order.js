import React from 'react'
import { connect } from 'react-redux'

import { fetchOrder } from '../../actions/expert'

import OrderUpdate from './order/OrderUpdate'
import ApplicationsSummary from './order/ApplicationsSummary'
import ApplicationAdd from './order/ApplicationAdd'

const mapStateToProps = state => ({
    order: state.expert.order,
    user: state.user
})

const mapDispatchToProps = dispatch => ({ fetchOrder: idOrder => dispatch(fetchOrder(idOrder)) })

class Order extends React.Component {
    
    componentWillMount() {
        let { fetchOrder, idOrder } = this.props
        fetchOrder(idOrder)
    }

    render() {
        let { order, fetching, fetched, rerender } = this.props.order
        let { fetchOrder, idOrder, supportView } = this.props
        if(rerender) fetchOrder(idOrder)
         
        return (
            <div class='container expert'>
                <h2>Exesting Applications</h2>
                <hr/>
                {
                    fetching ?
                    null :
                    fetched ?
                    order ?
                    <div>
                        <OrderUpdate supportView={supportView} order={order}/>
                        <ApplicationsSummary applications={order.applications} />
                        <ApplicationAdd idOrder={order._id} />
                    </div> :
                    null :
                    <div> Loading </div>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)