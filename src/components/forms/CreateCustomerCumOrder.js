import React from 'react';
import { connect } from 'react-redux';
import { postCustomerCumOrder } from '../../actions/support';
import { Tab, TabPanel, TabList, Tabs } from 'react-tabs'
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
            tabIndex : 0,
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
         let tabindex = 0;
        return(
            <div class='dimensions'>
                <div class='order-generation-header'>
                    <h4>Create Order</h4>
                </div>
            <Tabs style={{backgroundColor:'#ffffff'}} selectedIndex={this.state.tabIndex} onSelect={tabIndex=>this.setState({...this.state, tabIndex : tabIndex})}>
            <TabList>
                <Tab> Basic Info </Tab>
                <Tab> Visa Detail </Tab>
                <Tab> Assign To </Tab>
            </TabList>
            <TabPanel>
                <div>
                    Channel:
                <button class='channel'  value='B2B' style={{backgroundColor:`${this.state.customer.channel==='B2B'? '#eceff1':'#4a90e2'}`}} onClick={event => {
                    this.setState({...this.state,
                        customer: {
                            ...this.state.customer,
                            channel: event.target.value
                        }
                    });
                    }}>B2B</button>
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
                        
                    })}}>Corporate</button>
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
            <TabPanel>
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
                                name: index === 0 ? this.state.customer.name : 'Applicant '+(index),
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
            <div style={{paddingTop:'3%', height:'250px'}}>
                <div class='row application-label'>
                    <label class='col-lg-3'> Name </label>
                    <label class='col-lg-3'> Country </label>
                    <label class='col-lg-3'> Visa </label>
                    <label class='col-lg-3'> Travel Date </label>
                </div>
                {
                    this.state.apps.map((app, index) =>
                        <div key={index} class='row'>
                            <div class='col-lg-3'>
                                <input type='text' onChange = {event => {
                                    let apps = [...this.state.apps]
                                    let application = {...apps[index]}
                                    application.name = event.target.value
                                    apps[index] = application
                                    this.setState({...this.state, apps})
                                }} value={this.state.apps[index].name}/>
                            </div>
                            <div class='col-lg-3'>
                                <select onChange = {event => {
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
                            </div>
                            <div class='col-lg-3'>
                                <select onChange = {event => {
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
                            </div>
                            <div class='col-lg-3'>
                                <input type='date' value={this.state.apps[index].travelDate}
                                    onChange = {event => {
                                        let apps = [...this.state.apps];
                                        for(let i=index; i<apps.length; i++) {
                                            let application = {...apps[i]};
                                            application.travelDate = event.target.value;
                                            apps[i] = application;
                                        }
                                        this.setState({...this.state, apps});
                                    }}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
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
                            experts.experts.map((exp, index) => 
                                <label class='container1'>
                                    <input  type='radio' name='Visa-Expert' defaultChecked={this.state.order.idExpert === exp._id} key={exp._id} value={exp._id} onChange={event => {
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
                    let applications = this.state.apps
                    if(!name) return alert('Enter customer name')
                    if(!email) return alert('Enter customer email')
                    if(!phone) return alert('Enter customer phone')
                    if(!noOfApplications) return alert('Enter no of Applications')
                    if(!idExpert) return alert('No expert selected')
                    if(applications.length === 0) return alert('No application')
                    
                    for(let app of applications) {
                        if(!app.travelDate || app.travelDate < new Date().toISOString().split('T')[0]) return alert('Invalid date entered')
                    }
                    
                    postCustomerCumOrder(this.state)}} class="btn btn-primary show-requirements-button">
                    Create Customer and Order
                </button>
            </TabPanel>
            <div>
                <button class='channel' style={{float:'right'}} onClick={(event)=>{this.state.tabIndex === 0 ? this.setState({...this.state, tabIndex : 1}) : this.state.tabIndex===1 ? this.setState({...this.state, tabIndex : 2}) : null}}>Next</button>
                <button class='channel' onClick={(event)=>{this.state.tabIndex===2 ? this.setState({...this.state, tabIndex : 1}):this.state.tabIndex===1 ? this.setState({...this.state, tabIndex : 0}):null}}>Prev</button>
            </div>
        </Tabs>
        </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomerCumOrder);