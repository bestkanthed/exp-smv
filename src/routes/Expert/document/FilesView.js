import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { deleteFile } from '../../../actions/expert'

import Dropzone from 'react-dropzone'
import PdfViewer from '../../../components/utilities/PdfViewer'

const mapDispatchToProps = dispatch => ({ deleteFile: idFile => dispatch(deleteFile(idFile)) })

const FilesView = ({files, idDocument, fetchDocument, deleteFile}) => (
    <div>
        {
            files.map(file =>
                <div key={file._id}>
                    {
                        (file.uploadName.split('.').pop()).toLowerCase() === 'pdf' ?
                        <PdfViewer file={'http://localhost:1169/expert/files/'+file._id} /> :
                        <img src={'http://localhost:1169/expert/files/'+file._id} />
                    }
                </div>
            )
        }
    </div>
)

export default connect(null, mapDispatchToProps)(FilesView)