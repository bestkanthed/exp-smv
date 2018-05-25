import React from 'react'
import { connect } from 'react-redux'

import { uploadDocument } from '../../actions/expert'

import Dropzone from 'react-dropzone'

const mapStateToProps = state => ({ document: state.expert.document })
const mapDispatchToProps = dispatch => ({ uploadDocument: (file, idDocument) => dispatch(uploadDocument(file, idDocument)) })

const UploadDocument = ({document, uploadDocument}) => {
    if(!document.document) return <div>No document seleted to upload file</div>
    return <Dropzone onDrop={file => uploadDocument(file, document.document._id)}/>
}
export default connect(mapStateToProps, mapDispatchToProps)(UploadDocument)