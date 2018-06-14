import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Tab, TabPanel, TabList, Tabs } from 'react-tabs'

import { fetchApplication, fetchOrderByIdApplication, setQuery } from '../../actions/expert'

import DocumentsPreview from './application/DocumentsPreview'
import DocumentAdd from './application/DocumentAdd'
import ApplicationUpdate from './application/ApplicationUpdate';

const documentsOrder = [
    'Mandatory Documents',
    'Forms & Letters',
    'Travel Proofs',
    'Financial Documents',
    'Occupation Proofs',
    'Others'
]

const mapStateToProps = state => ({
    order: state.expert.order,
    application: state.expert.application,
    user: state.user,
})

const mapDispatchToProps = dispatch => ({
    fetchApplication: idApplication => dispatch(fetchApplication(idApplication)),
    fetchOrderByIdApplication: idApplication => dispatch(fetchOrderByIdApplication(idApplication)),
    setQuery: query => dispatch(setQuery(query)),
})

class Application extends React.Component {
    
    componentWillMount() {
        let { fetchApplication, idApplication, fetchOrderByIdApplication } = this.props
        fetchApplication(idApplication)
        let { order } = this.props.order
        if (!order) fetchOrderByIdApplication(idApplication)
    }

    render() {
        let categories = null
        let documents = null
        let { fetchApplication, idApplication, idCustomer, setQuery } = this.props        
        let { application, fetching, fetched, rerender } = this.props.application
        let { order } = this.props.order
        
        if (application) documents  = application.documents.sort((d1,d2) => ( documentsOrder.indexOf(d1.category) < documentsOrder.indexOf(d2.category) ? -1 : 1 ) )
        if(documents) categories = documents.map(document => document.category)

        if(rerender) fetchApplication(idApplication)
        return (
            <div class='expert'>
                {
                    fetched ?
                    application ?
                    <div class='application-view'>
                        {
                            order ?
                            <h4>
                                <Link to={idCustomer ? '/customer/orders' : '/expert/orders'}> Home </Link>
                                >
                                <Link to={idCustomer ? '/customer/orders' : '/expert/orders'} onClick={() => {if (!idCustomer) setQuery({ orderType: order.orderType }) }}> {order.orderType} </Link>
                                >
                                <Link to={(idCustomer ? '/customer' : '/expert' )+'/orders/'+order._id}> {order.customer.length ? order.customer[0].name : null} </ Link>
                                > {application.name}
                            </h4> :
                            null
                        }
                        <ApplicationUpdate idCustomer={idCustomer} application={application}/>
                        <hr />
                        <Tabs>
                            <TabList>
                            {
                             categories.map(category => 
                                    <Tab key={category}>{category}</Tab>
                                )
                            }
                            </TabList>
                            {
                                documents.map(document => 
                                    <span key={document.category}><TabPanel>
                                        <DocumentsPreview idCustomer={idCustomer} documents={document.documents}/>
                                    </TabPanel></span>
                                )
                            }
                        </Tabs>
                        <hr/>
                        {
                            idCustomer ? null : <DocumentAdd idApplication = {idApplication}/>
                        }
                    </div>:
                    <div> This application does not exist </div> :
                    fetching ?
                    <div> Loading </div> :
                    <div> Failed to load </div>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application)