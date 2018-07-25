import React from 'react'
import { connect } from 'react-redux'
import { addNewItem } from '../../actions/support'

const mapDispatchToProps = (dispatch) => {
    return {
        addNewItem : item => {dispatch(addNewItem(item))} 
    }
}

class PaymentItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
                service : '', 
                quantity : 1, 
                rate : 0, 
                tax : 'Out of Scope'
            }
        this.setService.bind(this)
        this.setQty.bind(this)
    }   

    setService(serviceName) {
        console.log('here----')
        let serv = this.props.services.filter((elem) => {
            return elem.Name === serviceName
        })
        console.log(serv[0])
        this.setState(
            {
                service : serv[0].Name, 
                quantity : this.state.quantity, 
                rate : serv[0].UnitPrice, 
                tax : serv[0].SalesTaxCodeRef.name,
            })
        let amt  = this.state.rate * this.state.quantity
            console.log(amt, '000')
    }

    setQty(qty) {
        let service = this.props.services.filter((elem) => {
            return elem.Name === this.state.service
        })
        this.setState({...this.state, quantity : qty})
    }

    render() {
        let service, rate
        return (
            <div>
                <tr>
                    <td>
                        Serivce : 
                        <select onChange={(event)=> {this.setService(event.target.value)}}>
                            {
                                this.props.services ? 
                                    this.props.services.map(service => {
                                        return <option>{service.Name}</option>
                                    }) : null
                            }
                        </select>
                    </td>
                    <td>
                        qty : <input type='number' min='1'  defaultValue={1} onChange={(event) => {event.target.value > 0 ? this.setQty(event.target.value) : alert('Please enter a positve num')}} />
                    </td>
                    <td>
                        rate :<span>
                            {this.state.rate} 
                             </span>
                    </td>
                    <td>
                        amount :<span>
                            {this.state.rate * this.state.quantity}
                        </span>
                    </td>
                    <td>
                        tax : 
                        <span>
                            {this.state.tax}
                        </span>
                    </td>
                    <td>
                        <button onClick={() => {this.props.addNewItem(this.state)}}>create</button>
                    </td>
                </tr>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(PaymentItem)