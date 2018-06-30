import React from 'react'
import { connect } from 'react-redux'

import { fetchNews, setIdOrder, fetchExperts } from '../../actions/support'
import { deleteOrder } from '../../actions/expert'
import { loadPopup } from '../../actions/popup'

const mapStateToProps = state => ({ news: state.support.news })

const mapDispatchToProps = dispatch => ({
    fetchNews: () => dispatch(fetchNews()),
    loadPopup: content => dispatch(loadPopup(content)),
    setIdOrder: idOrder => dispatch(setIdOrder(idOrder)),
    deleteOrder: idOrder => dispatch(deleteOrder(idOrder)),
    fetchExperts: () => dispatch(fetchExperts())
})

class News extends React.Component {
    
    componentWillMount() {
        
        this.props.fetchNews()
        this.props.fetchExperts()
    }

    render() {
        let { setIdOrder, loadPopup, deleteOrder } = this.props
        let { news, fetching, fetched } = this.props.news
        return (
            <div class='expert'>
                <h1>New Orders</h1>
                <hr/>
                {
                    news ?
                    news.map(order =>
                        <div class='col-md-6 col-sm-12 col-lg-3' key={order._id}>
                            <p>{order.customer[0] ? order.customer[0].name : null}</p>
                            <p>{order.customer[0] ? order.customer[0].email : null}</p>
                            <p>{order.customer[0] ? order.customer[0].phone : null}</p>
                            <button type='button' onClick = {() => { setIdOrder(order._id) ; loadPopup('ProcessOrder') }} class="btn btn-primary show-requirements-button"> Process </button>
                            <button type='button' onClick = {() => { if(confirm("Are you sure you want to delete")) deleteOrder(order._id)} } class="btn btn-primary show-requirements-button"> Delete </button>
                        </div>
                    ) :
                    <h2>Error connecting to the server</h2>
                }
            </div> 
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(News)