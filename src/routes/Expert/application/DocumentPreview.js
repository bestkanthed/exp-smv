import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { uploadFile, changeDocumentCategory, deleteDocument, fileTypeRejected } from '../../../actions/expert'

import Dropzone from 'react-dropzone'
import PdfViewer from '../../../components/utilities/PdfViewer'

import './Application.scss';
import { Z_BLOCK } from 'zlib';

const accpectedFileTypes = [
    'jpeg',
    'jpg',
    'png',
    'pdf',
    'doc',
    'docx',
    'xls',
    'xlsx',
]

const imageTypes = [
    'jpeg',
    'jpg',
    'png'
]

const mapDispatchToProps = dispatch => ({
    uploadFiles: (files, idDocument, idCustomer) => files.map(file => {
        let extension = file.name.split('.').pop()
        extension = extension ? extension.toLowerCase() : 'none'
        console.log('Logging file name and extension', file.name, file.name.split('.').pop())
        if ( accpectedFileTypes.indexOf(extension) === -1 ) dispatch(fileTypeRejected())
        else dispatch(uploadFile(file, idDocument, idCustomer))
    }),
    changeDocumentCategory: (category, idDocument) => dispatch(changeDocumentCategory(category, idDocument)),
    deleteDocument: idDocument => dispatch(deleteDocument(idDocument))
})

class DocumentPreview extends React.Component {
    render() {
        let category
        let { uploadFiles, changeDocumentCategory, deleteDocument, idCustomer } = this.props
        let document = this.props.document
        let details
        return (
            <div class='document-view' key={document._id}>
                {
                    document.previewFileName ?
                    
                    <Link to={(idCustomer ? '/customer' : '/expert')+'/documents/'+document._id}>
                        {
                            (document.previewFileName.split('.').pop()).toLowerCase() === 'pdf' ?
                            <div>
                                <p>{document.name}</p>
                                <div class='pdf-view'>
                                    <PdfViewer file={'/api/expert/documents/'+document._id+'/preview'} />
                                </div>
                            </div> :
                            imageTypes.indexOf((document.previewFileName.split('.').pop()).toLowerCase()) !== -1 ?
                            <img src={'/api/expert/documents/'+document._id+'/preview'} /> :
                            <a href={'/api/expert/documents/'+document._id+'/preview'}>{document.previewFileName}</a>
                        }
                    </Link> :
                    <Dropzone onDrop={files => uploadFiles(files, document._id, idCustomer)}/>
                }

                <div class='details-mask row row-align'>
                    <span class='col-lg-6' onClick={()=>{details.style.display='block'}}>Show</span>
                    <span class='col-lg-6' onClick={()=>{details.style.display='none'}}>Hide</span>
                </div>
                
                <div class='details-mask' style={{display:'none'}} ref={node=>{details=node}}>
                    <p>{document.comments}</p>
                    <p>Status:{document.status}</p>
                </div>
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
                        
                        <div class='row' style={{paddingLeft:'13%'}}>
                            <button type='button' onClick = {() => changeDocumentCategory(category.value, document._id )} class="btn btn-primary col-lg-5"> Move </button>
                            <button type='button' style={{marginLeft:'3%'}} onClick = {() => deleteDocument(document._id)} class="btn btn-primary col-lg-5"> Delete </button>  
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(DocumentPreview)