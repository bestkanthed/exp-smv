import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { uploadDocument, changeDocumentCategory, deleteDocument } from '../../../actions/expert'

import Dropzone from 'react-dropzone'
import PdfViewer from '../../../components/utilities/PdfViewer'

const mapDispatchToProps = dispatch => ({
    uploadDocument: (file, idDocument) => dispatch(uploadDocument(file, idDocument)),
    changeDocumentCategory: (category, idDocument) => dispatch(changeDocumentCategory(category, idDocument)),
    deleteDocument: (idDocument) => dispatch(deleteDocument(idDocument))
})

class DocumentPreview extends React.Component {
    render() {
        let category
        let { uploadDocument, changeDocumentCategory, deleteDocument } = this.props
        let document = this.props.document
        return (
            <div class='document-view' key={document._id}>
                <p>{document.name}</p>
                    {
                        document.uploadedName ?
                        <Link to={'/expert/documents/'+document._id}>
                            {
                                (document.uploadedName.split('.').pop()).toLowerCase() === 'pdf' ?
                                <PdfViewer file={'http://localhost:1169/expert/documents/'+document._id+'/file'} /> :
                                <img src={'http://localhost:1169/expert/documents/'+document._id+'/file'} />
                            }
                        </Link> :
                        <Dropzone onDrop={file => uploadDocument(file, document._id)}/>
                    }
                <p>{document.unseenComments}</p>
                <p>{document.status ? "OK" : "NOT OKAY"}</p>
                <div>
                    Move to : <select name="category" id="category"
                        ref = {node => {
                        category = node;
                        }}
                    >
                        <option value='Passport'>Passport</option>
                        <option value='Photograph'>Photograph</option>
                        <option value='Forms & Letters'>Forms & Letters</option>
                        <option value='Financials'>Financials</option>
                        <option value='Employment Proofs'>Employment Proofs</option>
                        <option value='Booking'>Booking</option>
                        <option value='Insurance'>Insurance</option>
                        <option value='Additional'>Additional</option>
                    </select>
                    <button type='button' onClick = {() => changeDocumentCategory(category.value, document._id )} class="btn btn-primary"> Move </button>
                    <button type='button' onClick = {() => deleteDocument(document._id)} class="btn btn-primary"> Delete </button>
                </div>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(DocumentPreview)