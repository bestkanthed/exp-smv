import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { uploadFile, changeDocumentCategory, deleteDocument } from '../../../actions/expert'

import Dropzone from 'react-dropzone'
import PdfViewer from '../../../components/utilities/PdfViewer'

import './Application.scss';
import { Z_BLOCK } from 'zlib';

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
        let details
        return (
            <div class='document-view' key={document._id}>
                {
                    document.previewFileName ?
                    
                    <Link to={(idCustomer ? '/customer' : '/expert')+'/documents/'+document._id}>
                        {
                            (document.previewFileName.split('.').pop()).toLowerCase() === 'pdf' ?
                            <div>
                                <div class='pdf-view'>
                                    <PdfViewer file={'http://localhost:1169/expert/documents/'+document._id+'/preview'} />
                                </div>
                            </div> :
                            <img src={'http://localhost:1169/expert/documents/'+document._id+'/preview'} />
                        }
                    </Link> :
                    <Dropzone onDrop={files => uploadFiles(files, document._id, idCustomer)}/>
                }

                <div class='details-mask row row-align'>
                    <span class='col-lg-6' onClick={()=>{details.style.display='block'}}>Show</span>
                    <span class='col-lg-6' onClick={()=>{details.style.display='none'}}>Hide</span>
                </div>
                
                <div class='details-mask' style={{display:'none'}} ref={node=>{details=node}}>
                    <p>{document.name}</p>
                    <p>{document.comments}</p>
                    <p>Status:{document.status ? "OK" : "NOT OKAY"}</p>
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
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(DocumentPreview)