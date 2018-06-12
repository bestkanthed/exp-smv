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
                <div>
                Create Order
                </div>
                <br/>
        <Tabs style={{backgroundColor:'rgba(0, 0, 0, 0.05)'}}>
            <TabList>
                <Tab>Basic Info</Tab>
                <Tab>Visa Detail</Tab>
                <Tab>Assign To</Tab>
            </TabList>
            <TabPanel>
                <div>
                    Channel:
                <div class='channel' onClick={event => {
                    this.setState({...this.state,
                        customer: {
                            ...this.state.customer,
                            channel: event.target.value
                        }
                    }); console.log('Logging state form channel', this.state)}}> B2B</div>
                <div class='channel' onClick={event => {
                    this.setState({...this.state,
                        customer: {
                            ...this.state.customer,
                            channel: event.target.value
                        }
                    })}}> B2C </div>
                <div class='channel' onClick={event => {
                    this.setState({...this.state,
                        customer: {
                            ...this.state.customer,
                            channel: event.target.value
                        }
                    })}}> Corporate</div>
                </div>
                <br/>
                <div style={{marginLeft:'10px'}}>
                    Invoice No :<div><input type="text" required="required" value={this.state.order.invoiceNo} onChange={event => {
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
                Customer Name : <div><input type="text" required="required" value={this.state.customer.name} onChange={event => {
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
                Email : <div><input type="email" required="required" value={this.state.customer.email} onChange={event => {
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
                Phone : <div><input type="text" required="required" value={this.state.customer.phone} onChange={event => {
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
            <div>Order Type :<select required="required" value={this.state.order.orderType} onChange={event => {
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
            <div>Story :<input type="text" required="required" value={this.state.order.story} onChange={event => {
                    this.setState({...this.state,
                        order: {
                            ...this.state.order,
                            story: event.target.value
                        }
                    })
                    console.log('Logging state from story', this.state)
                }}/></div>
            <div>No of Applications:<br/><input type="number" required="required" value={this.state.order.noOfApplications}
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
            <br/>
            <div>
                {
                    this.state.apps.map((app, index) =>
                        <div key={index}>
                            <div class='row moveLeft'>
                            <input class='col-lg-3'type='text' defaultValue={app.name} onChange = {event => {
                                let apps = [...this.state.apps]
                                let application = {...apps[index]}
                                application.name = event.target.value
                                apps[i] = application
                                this.setState({...this.state, apps})
                            }}/>
                            <select class='col-lg-2' style={{paddingLeft:'2%'}} onChange = {event => {
                                
                                let apps = [...this.state.apps]
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
                            <select class='col-lg-2' style={{paddingLeft:'2%'}} onChange = {event => {
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
                            
                            <input class='col-lg-3' style={{paddingLeft:'2%'}} type='date' value={this.state.apps[index].travelDate}
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
                    <div>
                        {
                            experts.fetching ?
                            null :
                            experts.fetched ?
                            experts.experts ?
                            experts.experts.map(exp => 
                                <button  key={exp._id} value={exp._id} onClick={event => {
                                    console.log('Logging div onClick event', event.target.value);
                                    this.setState({...this.state,
                                        order: {
                                            ...this.state.order,
                                            idExpert: event.target.value
                                        }
                                    })
                                }} ><br/> {exp.name}</button>
                            ) :
                            null :
                            null
                        }
                    </div>
                  <br/>
                </div>
                <button type='submit' onClick = {e => { e.preventDefault()
                    let {name, email, phone} = this.state.customer
                    let {noOfApplications} = this.state.order
                    if(!name) return alert('Enter customer name')
                    if(!email) return alert('Enter customer email')
                    if(!phone) return alert('Enter customer phone')
                    if(!noOfApplications) return alert('Enter no of Applications')
                    postCustomerCumOrder(this.state)}} class="btn btn-primary show-requirements-button">
                    Create Customer and Order
                </button>
            </TabPanel>
        </Tabs>
        </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomerCumOrder);