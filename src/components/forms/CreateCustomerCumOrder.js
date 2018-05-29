import React from 'react';
import { connect } from 'react-redux';
import { postCustomerCumOrder } from '../../actions/support';
import { Tab, TabPanel, TabList, Tabs } from 'react-tabs'
import axios from 'axios';

const mapStateToProps = state => {
    return {
        experts: state.support.experts
    }
}

const mapDispatchToProps = dispatch => {
  return {
    postCustomerCumOrder: form => dispatch(postCustomerCumOrder(form))
  }
}

class CreateCustomerCumOrder extends React.Component {
    constructor (props) {
        super(props)
        console.log("logging props from cc", props)
        this.state = {
            apps : [],
            customer: {
                channel: 'B2B',
                name: null,
                email: null,
                phone: null
            },
            order: {
                idExpert: null,
                orderType: 'eVisa',
                invoiceNo: null,
                noOfApplications: null,
                story: null
            },
        }
    }
    
    componentDidMount () {
        let { experts } = this.props.experts
        if(experts.length) this.setState({...this.state,
            order: {
                ...this.state.order,
                idExpert: experts[0]._id 
            }
        })
    }

    render () {
        let { experts, postCustomerCumOrder } = this.props
        
        return (
            <div class="row login-form">
            <div class="col-lg-12">
                <form id="login_form" class="show-requirements" style={{fontSize: '16px'}}>
                <h3>Create Customer Account & Order</h3>
                <label>Channel : </label><select required="required" onChange={event => {
                    this.setState({...this.state,
                        customer: {
                            ...this.state.customer,
                            channel: event.target.value
                        }
                    })
                }}>
                    <option value='B2B'>B2B</option>
                    <option value='B2C'>B2C</option>
                    <option value='Corporate'>Corporate</option>
                </select>
                <label>Customer Name : </label><input type="text" required="required" onChange={event => {
                    this.setState({...this.state,
                        customer: {
                            ...this.state.customer,
                            name: event.target.value
                        }
                    })
                }}/>
                <label>Email : </label><input type="email" required="required" onChange={event => {
                    this.setState({...this.state,
                        customer: {
                            ...this.state.customer,
                            email: event.target.value
                        }
                    })
                }} />
                <label>Phone : </label><input type="text" required="required" onChange={event => {
                    this.setState({...this.state,
                        customer: {
                            ...this.state.customer,
                            phone: event.target.value
                        }
                    })
                }} />
                <label>Order Type : </label><select required="required" onChange={event => {
                    this.setState({...this.state,
                        order: {
                            ...this.state.order,
                            orderType: event.target.value
                        }
                    })
                }}>
                    <option value='eVisa'>eVisa</option>
                    <option value='Pickup & Drop'>Pickup & Drop</option>
                    <option value='Online Consultation'>Online Consultation</option>
                    <option value='Mixed'>Mixed</option>
                </select>
                <label>Invoice No : </label><input type="text" required="required"  onChange={event => {
                    this.setState({...this.state,
                        order: {
                            ...this.state.order,
                            invoiceNo: event.target.value
                        }
                    })
                }} />
                <label>Story : </label><input type="text" required="required" onChange={event => {
                    this.setState({...this.state,
                        order: {
                            ...this.state.order,
                            story: event.target.value
                        }
                    })
                    console.log('Logging state from story', this.state)
                }}/>
                <label>No of Applications:</label><input type="number" required="required"
                    onChange={event => {
                        let apps = (Array(Number(event.target.value)).fill(null)).map((value, index) => 
                            ({
                                name: 'Customer'+(index+1),
                                country: 'Singapore',
                                visaType: 'Tourist',
                                travelDate: new Date().toISOString().slice(0,10),
                            })
                        )
                        this.setState({...this.state,
                            order: {
                                ...this.state.order,
                                noOfApplications: event.target.value
                            },
                            apps
                        })
                    }} />
                {
                    this.state.apps.map((app, index) =>
                        <div key={index}>
                            <input type='text' defaultValue={app.name} onChange = {event => {
                                let apps = [...this.state.apps]
                                let application = {...apps[index]}
                                application.name = event.target.value
                                apps[i] = application
                                this.setState({...this.state, apps})
                            }}/>
                            <select onChange = {event => {
                                    let apps = [...this.state.apps];
                                    for(let i=index; i<apps.length; i++) {
                                        let application = {...apps[i]};
                                        application.country = event.target.value;
                                        apps[i] = application;
                                    }
                                    this.setState({...this.state, apps});
                                }} value={this.state.apps[index].country}>
                                <option value='Singapore'> Singapore </option>
                                <option value='Malaysia'> Malaysia </option>
                                <option value='US'> USA </option>
                                <option value='Thailand'> Thailand </option>
                            </select>
                            <select onChange = {event => {
                                    let apps = [...this.state.apps];
                                    for(let i=index; i<apps.length; i++) {
                                        let application = {...apps[i]};
                                        application.visaType = event.target.value;
                                        apps[i] = application;
                                    }
                                    this.setState({...this.state, apps});
                                }} value={this.state.apps[index].visaType}>
                                <option value='Tourist'> Tourist </option>
                                <option value='Business'> Business </option>
                                <option value='Family & Friends'> Family & Friends </option>
                                <option value='Honeymoon'> Honeymoon </option>
                            </select>
                            <input type='date' value={this.state.apps[index].travelDate}
                                onChange = {event => {
                                    console.log('logging date from date', event.target.value)
                                    let apps = [...this.state.apps];
                                    for(let i=index; i<apps.length; i++) {
                                        let application = {...apps[i]};
                                        application.travelDate = event.target.value;
                                        apps[i] = application;
                                    }
                                    this.setState({...this.state, apps});
                                }}
                            />
                        </div>
                    )
                }
                <label>Visa Expert : </label><select onChange={event => {
                    this.setState({...this.state,
                        order: {
                            ...this.state.order,
                            idExpert: event.target.value
                        }
                    })
                }}>
                    {
                        experts.fetching ?
                        null :
                        experts.fetched ?
                        experts.experts ?
                        experts.experts.map(exp => 
                            <option key={exp._id} value={exp._id} > {exp.name} </option>
                        ) :
                        null :
                        null
                    }
                </select>
                <button type='submit' onClick = {e => { e.preventDefault()
                    let {name, email, phone} = this.state.customer
                    let {noOfApplications} = this.state.order
                    if(!name) return alert('Enter customer name')
                    if(!email) return alert('Enter customer email')
                    if(!phone) return alert('Enter customer phone')
                    if(!noOfApplications) return alert('Enter no of Applications                                                                                                                                ')
                    postCustomerCumOrder(this.state)}} class="btn btn-primary show-requirements-button">
                    Create Customer and Order
                </button>
                </form>
            </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomerCumOrder);