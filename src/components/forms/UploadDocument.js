import React from 'react'
import { connect } from 'react-redux'

import { uploadFile } from '../../actions/expert'

import Dropzone from 'react-dropzone'

const mapStateToProps = state => ({
    document: state.expert.document,
    idCustomer : state.user.user ? state.user.user.teams.indexOf('customer') !== -1 ? state.user.user._id : null : null
})
const mapDispatchToProps = dispatch => ({ uploadFiles: (files, idDocument, idCustomer) => files.map(file => dispatch(uploadFile(file, idDocument, idCustomer))) })

const UploadDocument = ({document, uploadFiles, idCustomer}) => {
    if(!document.document) return <div>No document seleted to upload file</div>
    return <Dropzone onDrop={files => uploadFiles(files, document.document._id, idCustomer)}/>
}
export default connect(mapStateToProps, mapDispatchToProps)(UploadDocument)