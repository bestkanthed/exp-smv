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
                    Invoice No :<div><input class='createOrder' type="text" required="required"  onChange={event => {
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
                Customer Name : <div><input class='createOrder' style={{width:'80%'}} type="text" required="required" onChange={event => {
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
                Email : <div><input class='createOrder' style={{width:'80%'}} type="email" required="required" onChange={event => {
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
                Phone : <div><input class='createOrder' style={{width:'80%'}} type="text" required="required" onChange={event => {
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
            <div>Order Type: <select class='box' required="required" onChange={event => {
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
            <div>Story :<input type="text" class='createOrder' required="required" onChange={event => {
                    this.setState({...this.state,
                        order: {
                            ...this.state.order,
                            story: event.target.value
                        }
                    })
                    console.log('Logging state from story', this.state)
                }}/></div>
            <div>
                No of Applications:<input class='createOrder' type="number" required="required"
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
                                {purposes.purposes ? purposes.purposes.map(purpose => 
                                    <option value={purpose.name} key={purpose._id}> {purpose.name} </option> 
                                ) : null}
                            </select>
                            
                            <input class='col-lg-3 createOrder' style={{marginLeft:'2%'}} type='date' value={this.state.apps[index].travelDate}
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
                    <div style={{padding:'5%'}}>
                        {
                            experts.fetching ?
                            null :
                            experts.fetched ?
                            experts.experts ?
                            experts.experts.map(exp => 
                                <label class='container1'>
                                    <input  type='radio' name='Visa-Expert' checked key={exp._id} value={exp._id} onChange={event => {
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
                <br/>
        </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomerCumOrder);