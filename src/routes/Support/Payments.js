import React from 'react'
import { connect } from 'react-redux'
import { getServices, postBill } from '../../actions/support'

import PaymentItem from './PaymentItem'

const testObj = 
    {
        contact : {},
        orders : [
                {
                    service : "Belgium Visa Fees",
                    rate : 123,
                    quantity : 2,
                    tax : "18% GST"
                },
                {
                    service : "Brazil Visa Fees",
                    rate : 123,
                    quantity : 2,
                    tax : "18% GST"
                }
            ]
    }


const mapStateToProps = (state) => ({
    services : state.support.payments,
    user : state.user.user,
    orders : state.support.invoices
})

const mapDispatchToprops = (dispatch) => {
    return {
    getServices : (supportId) => dispatch(getServices(supportId)), 
    postBill : (bill) => dispatch(postBill(bill))
    }
}

class Payments extends React.Component {
    constructor(props) {
        super(props)
        this.props.getServices(this.props.user._id)
        this.state = {
            supportId : this.props.user._id,
            orders : []
        }
        this.setName.bind(this)
        this.setCc.bind(this)
        this.setEmail.bind(this)
        this.setNumber.bind(this)
        this.setOrder.bind(this)
    }

    setName(name){
        this.setState({...this.state, name : name})
    }
    setNumber(number){
        this.setState({...this.state, phoneNumber : number})
    }
    setCc(cc){
        this.setState({...this.state, countryCode : cc})
    }
    setEmail(email){
        this.setState({...this.state, email : email})
    }
    setOrder(){
        var promise = new Promise((resolve, reject) => {
            if(this.props.orders){
                this.setState({...this.state, orders : this.props.orders.items})
                resolve(this.props.orders.items)
            }
            else reject('not okay')
        })
        console.log(promise)
        promise.then(result => this.setState({...this.state, orders : result})).then((()=> {this.props.postBill(this.state)}))
    }

    render() {
        let {postBill, invoices} = this.props
        return (
            <div>
                <input type='text' placeholder='name' onChange={(event) => {this.setName(event.target.value)}}/>
                <input type='text' placeholder='cc' onChange={(event) => {this.setCc(event.target.value)}}/>
                <input type='text' placeholder='number' onChange={(event) => {this.setNumber(event.target.value)}}/>
                <input type='text' placeholder='email' onChange={(event) => {this.setEmail(event.target.value)}}/>
                {
                    this.props.services ?
                    this.props.services.data ?
                    <PaymentItem services={this.props.services.data} />
                 : 'loading...' : 'Please login into quickbooks again'
                }
                <button onClick={()=>{this.setOrder(); console.log(this.state)}}>generate link</button>
            </div>
        )
    }
}

 export default connect(mapStateToProps, mapDispatchToprops)(Payments)
//export default Payments