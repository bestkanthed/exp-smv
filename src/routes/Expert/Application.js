import React from 'react'
import { connect } from 'react-redux'
import { Tab, TabPanel, TabList, Tabs } from 'react-tabs'

import { fetchApplication } from '../../actions/expert'

import DocumentsPreview from './application/DocumentsPreview'

const mapStateToProps = state => ({
    expert: state.expert,
    user: state.user
})

const mapDispatchToProps = dispatch => ({ fetchApplication: idApplication => dispatch(fetchApplication(idApplication)) })

class Application extends React.Component {
    
    componentWillMount() {
        let { fetchApplication, idApplication } = this.props
        fetchApplication(idApplication)
    }

    render() {
        let categories = null
        let documents = null
        let { application } = this.props.expert.application
        
        if (application) documents  = application.documents
        if(documents) categories = documents.map(document => document.category)

        return (
            application ?
            <div class='container expert'>
                <h1 style={{paddingTop : '32px'}}>Application</h1>
                <hr/>
                
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
                            <TabPanel key={document.category}>
                                <DocumentsPreview documents={document.documents}/>
                            </TabPanel>
                        )
                    }
                </Tabs>
            </div> :
            <h2>Error connecting to the server</h2>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application)