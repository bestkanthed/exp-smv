import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadPopup } from '../../actions/popup'
import { fetchDocument, deleteDocument, changeDocumentStatus } from '../../actions/expert'

import PdfViewer from '../../components/utilities/PdfViewer'
import Comments from './document/Comments'
import FilesView from './document/FilesView'
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
        
        let { idCustomer ,deleteDocument, showUploadDocumentPopup, changeDocumentStatus, fetchDocument, idDocument, idComment } = this.props
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
                                <button onClick={() => showUploadDocumentPopup()}> Upload </button>
                                {
                                    idCustomer ?
                                    null :
                                    <Switch
                                        onChange={status => changeDocumentStatus(status, document._id)}
                                        checked={typeof(document.status) === "boolean"? document.status : false}
                                        id="status-switch"
                                    />
                                }
                            </div>
                        </div>
                        <FilesView idCustomer={idCustomer} files={document.files} idDocument={document._id}/>
                        <Comments idCustomer={idCustomer} comments={document.comments} idDocument={document._id}/>
                    </div> :
                    null :
                    <h2>Error connecting to the server</h2>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Document)