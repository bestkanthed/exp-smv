import React from 'react';
import { connect } from 'react-redux';
import { postProcessOrder } from '../../actions/support';
import { Tab, TabPanel, TabList, Tabs } from 'react-tabs'

const mapStateToProps = state => ({
    idOrder : state.support.process.idOrder,
    experts : state.support.experts,
    database : state.database
})

const mapDispatchToProps = dispatch => ({ postProcessOrder: form => dispatch(postProcessOrder(form)) })

class ProcessOrder extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            apps : [],
            idOrder: this.props.idOrder,
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
    
    render() {
        let { experts, postProcessOrder, database } = this.props
         let { countries, purposes } = database
        return(
            <div>
                <br/>
                <div>
                    Process Order
                </div>
                <br/>
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
            <div>Visa Expert:
                    <div>
                        {
                            experts.fetching ?
                            null :
                            experts.fetched ?
                            experts.experts ?
                            experts.experts.map(exp => 
                                <button  key={exp._id} value={exp._id} onClick={event => {
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
                    let {noOfApplications} = this.state.order
                    if(!noOfApplications) return alert('Enter no of Applications')
                    postProcessOrder(this.state)}} class="btn btn-primary show-requirements-button">
                    Process Order
                </button>
        </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessOrder);