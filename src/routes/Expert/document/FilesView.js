import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { deleteFile } from '../../../actions/expert'

import Dropzone from 'react-dropzone'
import PdfViewer from '../../../components/utilities/PdfViewer'

const imageTypes = [
    'jpeg',
    'jpg',
    'png'
]

const mapDispatchToProps = dispatch => ({ deleteFile: idFile => dispatch(deleteFile(idFile)) })

const FilesView = ({idCustomer, files, idDocument, fetchDocument, deleteFile}) => (
    <div>
        {
            // files.map(file =>
                <div key={files._id}>
                    {
                        (files.uploadName.split('.').pop()).toLowerCase() === 'pdf' ?
                        <PdfViewer file={'/api/expert/files/'+files._id} /> :
                        imageTypes.indexOf((files.uploadName.split('.').pop()).toLowerCase()) !== -1 ?
                        <img src={'/api/expert/files/'+files._id} /> :
                        <a href={'/api/expert/files/'+files._id}>{files.uploadName}</a>
                    }
                </div>
            //)
        }
    </div>
)

export default connect(null, mapDispatchToProps)(FilesView)