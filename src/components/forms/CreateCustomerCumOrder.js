import React from 'react';
import { connect } from 'react-redux';
import { postCustomerCumOrder } from '../../actions/support';
import { Tab, TabPanel, TabList, Tabs } from 'react-tabs'
import axios from 'axios';
import './CreateOrder.scss';


const mapStateToProps = state => {
    return {
        experts: state.support.experts,
        database: state.database
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
                name: undefined,
                email: undefined,
                phone: undefined
            },
            order: {
                idExpert: undefined,
                orderType: 'Pickup Drop',
                invoiceNo: undefined,
                noOfApplications: undefined,
                story: undefined,
                status: 'New'
            },
        }
    }
    
    componentDidMount () {
        let { experts } = this.props.experts
        if(experts) this.setState({...this.state,
            order: {
                ...this.state.order,
                idExpert: experts[0]._id 
            }
        })
    }

    render() {
        let { experts, postCustomerCumOrder, database } = this.props
         let { countries, purposes } = database
        return(
            <div>
                <br/>
                <div class='dimensions'>
                <h4>Create Order</h4>
        <Tabs style={{backgroundColor:'#ffffff'}}>
            <TabList style={{padding:'5%'}}>
                <Tab style={{padding:'5%'}}>Basic Info</Tab>
                <Tab style={{padding:'5%'}}>Visa Detail</Tab>
                <Tab style={{padding:'5%'}}>Assign To</Tab>
            </TabList>
            <TabPanel style={{padding:'5%'}}>
                <div>
                    Channel:
                <button class='channel'  value='B2B' style={{backgroundColor:`${this.state.customer.channel==='B2B'? '#eceff1':'#4a90e2'}`}} onClick={event => {
                    this.setState({...this.state,
                        customer: {
                            ...this.state.customer,
                            channel: event.target.value
                        }
                    });
                    }}>B2B{console.log('-----00000-----',event.target)}</button>
                <button class='channel' value='B2C' style={{backgroundColor:`${this.state.customer.channel==='B2C'? '#eceff1':'#4a90e2'}`}} onClick={event => {
                    this.setState({...this.state,
                        customer: {
                            ...this.state.customer,
                            channel: event.target.value
                        }
                    })}}>B2C</button>
                <button class='channel' value='Corporate' style={{backgroundColor:`${this.state.customer.channel==='Corporate'? '#eceff1':'#4a90e2'}`}} onClick={event => {
                    this.setState({...this.state,
                        customer: {
                            ...this.state.customer,
                            channel: event.target.value
                        }
                        
                    })}}>{console.log('0000000',this.state.customer.channel)}Corporate</button>
                </div>
                <br/>
                <div style={{marginLeft:'10px'}}>
                    Invoice No :<div><input class='createOrder' type="text" required="required" value={this.state.order.invoiceNo}  onChange={event => {
                    this.setState({...this.state,
                        order: {
                            ...this.state.order,
                            invoiceNo: event.target.value
                        }
                    })
                    console.log('Logging state form invoice', this.state)
                }} />
                </div>
                </div>
                <br/>
                <div style={{marginLeft:'10px'}}>
                Customer Name : <div><input class='createOrder' value={this.state.customer.name} style={{width:'80%'}} type="text" required="required" onChange={event => {
                    this.setState({...this.state,
                        customer: {
                            ...this.state.customer,
                            name: event.target.value
                        }
                    })
                }}/>
                </div>
                </div>
                <br/>
                <div style={{marginLeft:'10px'}}>
                Email : <div><input class='createOrder' style={{width:'80%'}} value={this.state.customer.email} type="email" required="required" onChange={event => {
                    this.setState({...this.state,
                        customer: {
                            ...this.state.customer,
                            email: event.target.value
                        }
                    })
                }} />
                </div>
                </div>
                <br/>
                <div style={{marginLeft:'10px'}}>
                Phone : <div><input class='createOrder' style={{width:'80%'}} value={this.state.customer.phone} type="text" required="required" onChange={event => {
                    this.setState({...this.state,
                        customer: {
                            ...this.state.customer,
                            phone: event.target.value
                        }
                    })
                }} />
                </div>
                </div>
                <br/>
            </TabPanel>
            <TabPanel style={{paddingLeft:'3%', borderRadius:'4px'}}>
            <div>Order Type: <select class='box' value={this.state.order.orderType} required="required" onChange={event => {
                    this.setState({...this.state,
                        order: {
                            ...this.state.order,
                            orderType: event.target.value
                        }
                    })
                }}>
                    <option value='Pickup Drop'>Pickup Drop</option>
                    <option value='eVisa'>eVisa</option>
                    <option value='Online Consultation'>Online Consultation</option>
                </select>
                </div>
            <div>Story :<input type="text" class='createOrder' value={this.state.order.story} required="required" onChange={event => {
                    this.setState({...this.state,
                        order: {
                            ...this.state.order,
                            story: event.target.value
                        }
                    })
                    console.log('Logging state from story', this.state)
                }}/></div>
            <div>
                No of Applications:<input class='createOrder' type="number" value={this.state.order.noOfApplications} required="required"
                    onChange={event => {
                        let apps = (Array(Number(event.target.value)).fill(null)).map((value, index) => 
                            ({
                                name: 'Customer'+(index+1),
                                country: countries.countries ? countries.countries[0].name : undefined,
                                countryCode: countries.countries ? countries.countries[0].countryId : undefined,
                                visas: countries.countries ? countries.countries[0].visas : undefined,
                                visaType: countries.countries ? countries.countries[0].visas[0] ? countries.countries[0].visas[0].name : undefined : undefined,
                                travelDate: new Date().toISOString().slice(0,10),
                                status: 'New Application'
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
            </div>
            <div style={{paddingTop:'3%'}}>
                {
                    this.state.apps.map((app, index) =>
                        <div key={index}>
                            <div class='row moveLeft'>
                            <input class='col-lg-3 createOrder' type='text' defaultValue={app.name} onChange = {event => {
                                let apps = [...this.state.apps]
                                let application = {...apps[index]}
                                application.name = event.target.value
                                apps[i] = application
                                this.setState({...this.state, apps})
                            }}/>
                            <select class='col-lg-2 box' style={{MarginLeft:'2%'}} onChange = {event => {
                                let apps = [...this.state.apps];
                                for(let i=index; i<apps.length; i++) {
                                    let application = {...apps[i]};
                                    application.country = event.target.value;
                                    application.countryCode = (countries.countries.find(c => c.name === event.target.value)).countryId
                                    application.visas = (countries.countries.find(c => c.name === event.target.value)).visas
                                    apps[i] = application;
                                }
                                this.setState({...this.state, apps});
                            }} value={this.state.apps[index].country}>
                                {countries.countries ? countries.countries.map(country => 
                                    <option value={country.name} key={country._id}> {country.name} </option> 
                                ) : null}
                            </select>
                            <select class='col-lg-2 box' style={{marginLeft:'2%'}} onChange = {event => {
                                    let apps = [...this.state.apps];
                                    for(let i=index; i<apps.length; i++) {
                                        let application = {...apps[i]};
                                        application.visaType = event.target.value;
                                        apps[i] = application;
                                    }
                                    this.setState({...this.state, apps});
                                }} value={this.state.apps[index].visaType}>
                                {this.state.apps[index].visas ? this.state.apps[index].visas.map(visa => 
                                    <option value={visa.name} key={visa._id}> {visa.name} </option> 
                                ) : null}
                            </select>
                            
                            <input class='col-lg-3 createOrder' style={{marginLeft:'2%'}} type='date' value={this.state.apps[index].travelDate}
                                onChange = {event => {
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
                <br/>
                </div>
                
                    )
                }
                </div>
            </TabPanel>
            <TabPanel>
                <div>Visa Expert:
                    <div style={{padding:'5%'}}>
                        {
                            experts.fetching ?
                            null :
                            experts.fetched ?
                            experts.experts ?
                            experts.experts.map((exp, index) => 
                                <label class='container1'>
                                    <input  type='radio' name='Visa-Expert' defaultChecked={index===0 ? true : false} key={exp._id} value={exp._id} onChange={event => {
                                        this.setState({...this.state,
                                            order: {
                                                ...this.state.order,
                                                idExpert: event.target.value
                                            }
                                        })
                                    }}/>{exp.name}<span class='checkmark'/>
                                </label>
                            ) :
                            null :
                            null
                        }
                    </div>
                  <br/>
                </div>
                <button type='submit' onClick = {e => { e.preventDefault()
                    let {name, email, phone} = this.state.customer
                    let { noOfApplications, idExpert } = this.state.order
                    if(!name) return alert('Enter customer name')
                    if(!email) return alert('Enter customer email')
                    if(!phone) return alert('Enter customer phone')
                    if(!noOfApplications) return alert('Enter no of Applications')
                    if(!idExpert) return alert('No expert selected')
                    postCustomerCumOrder(this.state)}} class="btn btn-primary show-requirements-button">
                    Create Customer and Order
                </button>
            </TabPanel>
        </Tabs>
                </div>
                <br/>
        </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomerCumOrder);