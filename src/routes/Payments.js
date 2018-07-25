import React from 'react'
import { connect } from 'react-redux'
import { getBill } from '../actions/support'

const mapDispatchToProps = (dispatch) => {
    return {
        getBill : (id) => dispatch(getBill(id))
    }
}

const mapStateToProps = (state) => ({
    bill : state.support.bill
})

class payments extends React.Component {
    constructor(props) {
        super(props)
        console.log(props.getBill(props.match.params.id))
    }
    render() {

        return (
            <div>
                for payment id {this.props.match.params.id}
                <br />
                {
                    this.props.bill.finding ? 
                        <div>Getting your bill</div> : 
                        <div>
                            {console.log(this.props.bill)}
                            
                                <p>{this.props.bill.contact.name}</p>
                                <p>{this.props.bill.contact.countryCode} {this.props.bill.contact.phoneNumber}</p>
                                <p>{this.props.bill.contact.email}</p>
                                <p>{this.props.bill.transactionStatus}</p>
                                {
                                    this.props.bill.orders.map(order => {
                                        return(
                                            <tr>
                                                <td style={{margin:'1%', border:'solid 1px black'}}>{order.service}</td>
                                                <td style={{margin:'1%', border:'solid 1px black'}}>{order.quantity}</td>
                                                <td style={{margin:'1%', border:'solid 1px black'}}>{order.rate}</td>
                                                <td style={{margin:'1%', border:'solid 1px black'}}>{order.rate * order.quantity}</td>
                                                <td style={{margin:'1%', border:'solid 1px black'}}>{order.tax}</td>
                                            </tr>
                                        )
                                    })
                                }
                                <button>Pay Now</button>
                        </div>
                }
            </div>
        )
    } 
}

export default connect(mapStateToProps, mapDispatchToProps)(payments)
