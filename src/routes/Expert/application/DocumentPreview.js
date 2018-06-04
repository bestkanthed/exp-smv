import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { uploadFile, changeDocumentCategory, deleteDocument } from '../../../actions/expert'

import Dropzone from 'react-dropzone'
import PdfViewer from '../../../components/utilities/PdfViewer'

const mapDispatchToProps = dispatch => ({
    uploadFiles: (files, idDocument, idCustomer) => files.map(file => dispatch(uploadFile(file, idDocument, idCustomer))),
    changeDocumentCategory: (category, idDocument) => dispatch(changeDocumentCategory(category, idDocument)),
    deleteDocument: idDocument => dispatch(deleteDocument(idDocument))
})

class DocumentPreview extends React.Component {
    render() {
        let category
        let { uploadFiles, changeDocumentCategory, deleteDocument, idCustomer } = this.props
        let document = this.props.document
        return (
            <div class='document-view' key={document._id}>
                <p>{document.name}</p>
                    {
                        document.previewFileName ?
                        <Link to={(idCustomer ? '/customer' : '/expert')+'/documents/'+document._id}>
                            {
                                (document.previewFileName.split('.').pop()).toLowerCase() === 'pdf' ?
                                <PdfViewer file={'http://localhost:1169/expert/documents/'+document._id+'/preview'} /> :
                                <img src={'http://localhost:1169/expert/documents/'+document._id+'/preview'} />
                            }
                        </Link> :
                        <Dropzone onDrop={files => uploadFiles(files, document._id, idCustomer)}/>
                    }
                <p>{document.unseenComments}</p>
                <p>{document.status ? "OK" : "NOT OKAY"}</p>
                { 
                    idCustomer ?
                    null :
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
                }
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(DocumentPreview)