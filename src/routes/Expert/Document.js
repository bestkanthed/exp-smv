import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { fetchDocument } from '../../actions/expert'

import PdfViewer from '../../components/utilities/PdfViewer'
import Comments from './document/Comments'

const mapStateToProps = state => ({
    expert: state.expert,
    user: state.user
})

const mapDispatchToProps = dispatch => ({ fetchDocument: idDocument => dispatch(fetchDocument(idDocument)) })

class Document extends React.Component {
    
    componentWillMount() {
        let { fetchDocument, idDocument } = this.props
        fetchDocument(idDocument)
    }

    render() {
        let { document } = this.props.expert.document

        return (
            document ?
            <div class='container document'>
                <h1 style={{paddingTop : '32px'}}>{document.name}</h1>
                <hr/>
                <PdfViewer file={document.link}/>
                <Comments comments={document.comments} />
            </div> :
            <h2>Error connecting to the server</h2>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Document)