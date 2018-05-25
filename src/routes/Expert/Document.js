import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadPopup } from '../../actions/popup'
import { fetchDocument, deleteDocument, changeDocumentStatus } from '../../actions/expert'

import PdfViewer from '../../components/utilities/PdfViewer'
import Comments from './document/Comments'
import Switch from 'react-switch'

const mapStateToProps = state => ({ document: state.expert.document })
const mapDispatchToProps = dispatch => ({
    fetchDocument: idDocument => dispatch(fetchDocument(idDocument)),
    deleteDocument: idDocument => dispatch(deleteDocument(idDocument)),
    showUploadDocumentPopup: () => dispatch(loadPopup('UploadDocument')),
    changeDocumentStatus: (status, idDocument) => dispatch(changeDocumentStatus(status, idDocument))
})

class Document extends React.Component {

    componentWillMount() {
        let { fetchDocument, idDocument } = this.props
        fetchDocument(idDocument)
    }
    
    render() {
        
        let { deleteDocument, showUploadDocumentPopup, changeDocumentStatus, fetchDocument,     idDocument } = this.props
        let { fetching, fetched, document, rerender } = this.props.document
        if (rerender) fetchDocument(idDocument)
        return (
            <div class='container document'>
                <h1 style={{paddingTop : '32px'}}>Document</h1>
                <hr/>
                {
                    fetching ?
                    null :
                    fetched ?
                    document ?
                    <div class='document-page-view'>
                        <div class='document-header'>
                            <div class='shift-left'>
                                <h3>{document.name}</h3>
                            </div>
                            <div class='shift-right'>
                                <button onClick={() => {deleteDocument(document._id); window.history.back()} }> Delete </button>
                                <button onClick={() => showUploadDocumentPopup()}> Upload </button>
                                <Switch
                                    onChange={status => changeDocumentStatus(status, document._id)}
                                    checked={typeof(document.status) === "boolean"? document.status : false}
                                    id="status-switch"
                                />
                            </div>
                        </div>
                        {
                            (document.uploadedName.split('.').pop()).toLowerCase() === 'pdf' ?
                            <PdfViewer file={'http://localhost:1169/expert/documents/'+document._id+'/file'} /> :
                            <img src={'http://localhost:1169/expert/documents/'+document._id+'/file'} />
                        }
                        <Comments comments={document.comments} idDocument={document._id}/>
                    </div> :
                    null :
                    <h2>Error connecting to the server</h2>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Document)