import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Dropzone from 'react-dropzone'
import PdfViewer from '../../../components/utilities/PdfViewer'

import { uploadDocument } from '../../../actions/expert'
import DocumentPreview from './DocumentPreview';

const mapDispatchToProps = dispatch => ({ uploadDocument: (document, id) => dispatch(uploadDocument(document, id)) })

const DocumentsPreview = ({ documents, uploadDocument }) => {
    let documentFile;
    return (
        <div class='documents-preview'>
            {
                documents ?
                documents.map(document => <DocumentPreview document={document} key={document._id}/>) :
                <h2> Error connecting the server </h2>
            }
        </div>
    )
}

export default connect(null, mapDispatchToProps)(DocumentsPreview)