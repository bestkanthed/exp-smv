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
                name: null,
                email: null,
                phone: null
            },
            order: {
                idExpert: null,
                orderType: 'Pickup Drop',
                invoiceNo: null,
                noOfApplications: null,
                story: null,
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

    // render () {
    //     let { experts, postCustomerCumOrder, database } = this.props
    //     let { countries, purposes } = database
        
    //     return (
    //         <div class="row login-form">
    //         <div class="col-lg-12">
    //             <form id="login_form" class="show-requirements" style={{fontSize: '16px'}}>
    //             <h3>Create Customer Account & Order</h3>
    //             <label>Channel : </label><select required="required" onChange={event => {
    //                 this.setState({...this.state,
    //                     customer: {
    //                         ...this.state.customer,
    //                         channel: event.target.value
    //                     }
    //                 })
    //             }}>
    //                 <option value='B2B'>B2B</option>
    //                 <option value='B2C'>B2C</option>
    //                 <option value='Corporate'>Corporate</option>
    //             </select>
    //             <label>Customer Name : </label><input type="text" required="required" onChange={event => {
    //                 this.setState({...this.state,
    //                     customer: {
    //                         ...this.state.customer,
    //                         name: event.target.value
    //                     }
    //                 })
    //             }}/>
    //             <label>Email : </label><input type="email" required="required" onChange={event => {
    //                 this.setState({...this.state,
    //                     customer: {
    //                         ...this.state.customer,
    //                         email: event.target.value
    //                     }
    //                 })
    //             }} />
    //             <label>Phone : </label><input type="text" required="required" onChange={event => {
    //                 this.setState({...this.state,
    //                     customer: {
    //                         ...this.state.customer,
    //                         phone: event.target.value
    //                     }
    //                 })
    //             }} />
    //             <label>Order Type : </label><select required="required" onChange={event => {
    //                 this.setState({...this.state,
    //                     order: {
    //                         ...this.state.order,
    //                         orderType: event.target.value
    //                     }
    //                 })
    //             }}>
    //                 <option value='Pickup Drop'>Pickup Drop</option>
    //                 <option value='eVisa'>eVisa</option>
    //                 <option value='Online Consultation'>Online Consultation</option>
    //             </select>
    //             <label>Invoice No : </label><input type="text" required="required"  onChange={event => {
    //                 this.setState({...this.state,
    //                     order: {
    //                         ...this.state.order,
    //                         invoiceNo: event.target.value
    //                     }
    //                 })
    //             }} />
    //             <label>Story : </label><input type="text" required="required" onChange={event => {
    //                 this.setState({...this.state,
    //                     order: {
    //                         ...this.state.order,
    //                         story: event.target.value
    //                     }
    //                 })
    //                 console.log('Logging state from story', this.state)
    //             }}/>
    //             <label>No of Applications:</label><input type="number" required="required"
    //                 onChange={event => {
    //                     let apps = (Array(Number(event.target.value)).fill(null)).map((value, index) => 
    //                         ({
    //                             name: 'Customer'+(index+1),
    //                             country: countries.countries ? countries.countries[0].name : undefined,
    //                             visaType: purposes.purposes ? purposes.purposes[0].name : undefined,
    //                             travelDate: new Date().toISOString().slice(0,10),
    //                             status: 'New Application'
    //                         })
    //                     )
    //                     this.setState({...this.state,
    //                         order: {
    //                             ...this.state.order,
    //                             noOfApplications: event.target.value
    //                         },
    //                         apps
    //                     })
    //                 }} />
    //             {
    //                 this.state.apps.map((app, index) =>
    //                     <div key={index}>
    //                         <input type='text' defaultValue={app.name} onChange = {event => {
    //                             let apps = [...this.state.apps]
    //                             let application = {...apps[index]}
    //                             application.name = event.target.value
    //                             apps[i] = application
    //                             this.setState({...this.state, apps})
    //                         }}/>
    //                         <select onChange = {event => {
    //                             let apps = [...this.state.apps];
    //                             for(let i=index; i<apps.length; i++) {
    //                                 let application = {...apps[i]};
    //                                 application.country = event.target.value;
    //                                 apps[i] = application;
    //                             }
    //                             this.setState({...this.state, apps});
    //                         }} value={this.state.apps[index].country}>
    //                             {countries.countries ? countries.countries.map(country => 
    //                                 <option value={country.name} key={country._id}> {country.name} </option> 
    //                             ) : null}
    //                         </select>
    //                         <select onChange = {event => {
    //                                 let apps = [...this.state.apps];
    //                                 for(let i=index; i<apps.length; i++) {
    //                                     let application = {...apps[i]};
    //                                     application.visaType = event.target.value;
    //                                     apps[i] = application;
    //                                 }
    //                                 this.setState({...this.state, apps});
    //                             }} value={this.state.apps[index].visaType}>
    //                             {purposes.purposes ? purposes.purposes.map(purpose => 
    //                                 <option value={purpose.name} key={purpose._id}> {purpose.name} </option> 
    //                             ) : null}
    //                         </select>
    //                         <input type='date' value={this.state.apps[index].travelDate}
    //                             onChange = {event => {
    //                                 console.log('logging date from date', event.target.value)
    //                                 let apps = [...this.state.apps];
    //                                 for(let i=index; i<apps.length; i++) {
    //                                     let application = {...apps[i]};
    //                                     application.travelDate = event.target.value;
    //                                     apps[i] = application;
    //                                 }
    //                                 this.setState({...this.state, apps});
    //                             }}
    //                         />
    //                     </div>
    //                 )
    //             }
    //             <label>Visa Expert : </label><select onChange={event => {
    //                 this.setState({...this.state,
    //                     order: {
    //                         ...this.state.order,
    //                         idExpert: event.target.value
    //                     }
    //                 })
    //             }}>
    //                 {
    //                     experts.fetching ?
    //                     null :
    //                     experts.fetched ?
    //                     experts.experts ?
    //                     experts.experts.map(exp => 
    //                         <option key={exp._id} value={exp._id} > {exp.name} </option>
    //                     ) :
    //                     null :
    //                     null
    //                 }
    //             </select>
    //             <button type='submit' onClick = {e => { e.preventDefault()
    //                 let {name, email, phone} = this.state.customer
    //                 let {noOfApplications} = this.state.order
    //                 if(!name) return alert('Enter customer name')
    //                 if(!email) return alert('Enter customer email')
    //                 if(!phone) return alert('Enter customer phone')
    //                 if(!noOfApplications) return alert('Enter no of Applications')
    //                 postCustomerCumOrder(this.state)}} class="btn btn-primary show-requirements-button">
    //                 Create Customer and Order
    //             </button>
    //             </form>
    //         </div>
    //         </div>
    //     )
    // }
    
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
                    })}}> B2B</div>
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
                    Invoice No :<div><input type="text" required="required"  onChange={event => {
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
                Customer Name : <div><input type="text" required="required" onChange={event => {
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
                Email : <div><input type="email" required="required" onChange={event => {
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
                Phone : <div><input type="text" required="required" onChange={event => {
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
            <div>Order Type :<select required="required" onChange={event => {
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
            <div>Story :<input type="text" required="required" onChange={event => {
                    this.setState({...this.state,
                        order: {
                            ...this.state.order,
                            story: event.target.value
                        }
                    })
                    console.log('Logging state from story', this.state)
                }}/></div>
            <div>No of Applications:<br/><input type="number" required="required"
                    onChange={event => {
                        let apps = (Array(Number(event.target.value)).fill(null)).map((value, index) => 
                            ({
                                name: 'Customer'+(index+1),
                                country: countries.countries ? countries.countries[0].name : undefined,
                                visaType: purposes.purposes ? purposes.purposes[0].name : undefined,
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
                                let apps = [...this.state.apps];
                                for(let i=index; i<apps.length; i++) {
                                    let application = {...apps[i]};
                                    application.country = event.target.value;
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
                                {purposes.purposes ? purposes.purposes.map(purpose => 
                                    <option value={purpose.name} key={purpose._id}> {purpose.name} </option> 
                                ) : null}
                            </select>
                            
                            <input class='col-lg-3' style={{paddingLeft:'2%'}} type='date' value={this.state.apps[index].travelDate}
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
                <br/>
                </div>
                
                    )
                }
                </div>
            </TabPanel>
            <TabPanel>
            {/* <label>Visa Expert : </label><select onChange={event => {
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
                </select> */}
                <div>Visa Expert:
                    <div>
                        {
                            experts.fetching ?
                            null :
                            experts.fetched ?
                            experts.experts ?
                            experts.experts.map(exp => 
                                <div  key={exp._id} value={exp._id} onClick={event => {
                                    this.setState({...this.state,
                                        order: {
                                            ...this.state.order,
                                            idExpert: event.target.value
                                        }
                                    })
                                }} ><br/> {exp.name}</div>
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