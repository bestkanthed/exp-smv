import React from 'react'
import { connect } from 'react-redux'

import { uploadFile } from '../../actions/expert'

import Dropzone from 'react-dropzone'

const mapStateToProps = state => ({ document: state.expert.document })
const mapDispatchToProps = dispatch => ({ uploadFiles: (files, idDocument) => files.map(file => dispatch(uploadFile(file, idDocument))) })

const UploadDocument = ({document, uploadFiles}) => {
    if(!document.document) return <div>No document seleted to upload file</div>
    return <Dropzone onDrop={files => uploadFiles(files, document.document._id)}/>
}
export default connect(mapStateToProps, mapDispatchToProps)(UploadDocument)