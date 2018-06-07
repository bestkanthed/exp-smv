import React from 'react'
import { connect } from 'react-redux'
import { Tab, TabPanel, TabList, Tabs } from 'react-tabs'

import { fetchApplication } from '../../actions/expert'

import DocumentsPreview from './application/DocumentsPreview'
import DocumentAdd from './application/DocumentAdd'
import ApplicationUpdate from './application/ApplicationUpdate';



const mapStateToProps = state => ({
    application: state.expert.application,
    user: state.user
})

const mapDispatchToProps = dispatch => ({ fetchApplication: idApplication => dispatch(fetchApplication(idApplication)) })

class Application extends React.Component {
    
    componentWillMount() {
        let { fetchApplication, idApplication } = this.props
        fetchApplication(idApplication)
    }

    render() {
        let name, country, visaType, travelDate, employmentStatus, submissionDate, status
        let categories = null
        let documents = null
        let { fetchApplication, idApplication, idCustomer } = this.props        
        let { application, fetching, fetched, error, rerender } = this.props.application
        
        if (application) documents  = application.documents
        if(documents) categories = documents.map(document => document.category)

        if(rerender) fetchApplication(idApplication) 
        return (
            <div class='container expert'>
                {
                    fetched ?
                    application ?
                    <div class='application-view'>
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
                                    <span key={document.category}><TabPanel >
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