import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Tab, TabPanel, TabList, Tabs } from 'react-tabs'

import { fetchApplication, fetchOrderByIdApplication, setQuery, setActiveTab } from '../../actions/expert'

import DocumentsPreview from './application/DocumentsPreview'
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
    activeTab: state.expert.activeTab
})

const mapDispatchToProps = dispatch => ({
    fetchApplication: idApplication => dispatch(fetchApplication(idApplication)),
    fetchOrderByIdApplication: idApplication => dispatch(fetchOrderByIdApplication(idApplication)),
    setQuery: query => dispatch(setQuery(query)),
    setActiveTab: index => dispatch(setActiveTab(index))
})

class Application extends React.Component {
    
    constructor (props) {
        super(props)
        this.state = { render : true }
    }

    componentWillMount() {
        let { fetchApplication, idApplication, fetchOrderByIdApplication } = this.props
        fetchApplication(idApplication)
        let { order } = this.props.order
        if (!order) fetchOrderByIdApplication(idApplication)
    }

    render() {
        let categories = null
        let documents = null
        let { fetchApplication, idApplication, idCustomer, setQuery, setActiveTab, activeTab } = this.props        
        let { application, fetching, fetched, rerender } = this.props.application
        let { order } = this.props.order
        
        if (application) documents  = application.documents.sort((d1, d2) => ( documentsOrder.indexOf(d1.category) < documentsOrder.indexOf(d2.category) ? -1 : 1 ) )
        if (documents) categories = idCustomer ? documents.map(document => document.category) : documentsOrder

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
                                <Link to={idCustomer ? '/customer/orders' : '/expert/orders'}>Home</Link>
                                <span>{' '}<img src='/images/ic/ic/ic_chevron_right_24px.png' />{' '}</span> 
                                <Link to={(idCustomer ? '/customer' : '/expert' )+'/orders/'+order._id}>
                                    {order.applications.length ? order.applications[0].name : null}x{order.noOfApplications} 
                                </ Link>
                                <span>{' '}<img src='/images/ic/ic/ic_chevron_right_24px.png' />{' '}</span> 
                                {application.name}
                            </h4> :
                            null
                        }
                        <ApplicationUpdate idCustomer={idCustomer} application={application} order={order}/>
                        <hr />
                        <Tabs onSelect={index => setActiveTab(index)} defaultIndex={activeTab}>
                            <TabList>
                            {
                                categories.map(category =>
                                    <Tab key={category}>{category}</Tab>
                                )
                            }
                            </TabList>
                            {
                                categories.map((category, index) =>
                                    <span key={category}>
                                        <TabPanel forceRender={index === activeTab}>
                                            <DocumentsPreview
                                                past = {application.status === 'Past'}
                                                idCustomer={idCustomer}
                                                category={category}
                                                idApplication={application._id}
                                                documents={documents.find(document => document.category === category)}
                                            />
                                        </TabPanel>
                                    </span>
                                )
                            }
                        </Tabs>
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