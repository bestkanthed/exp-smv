import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu} from 'reactstrap';

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

    constructor(props) {
        super(props);
        this.state={
            btnDropright:'true'
        }
    }

    render() {
        let category
        let { uploadFiles, changeDocumentCategory, deleteDocument, idCustomer } = this.props
        let document = this.props.document
        let details
        console.log('-----000))))))))', document)
        return (
            <div key={document._id}>
                <ButtonDropdown direction="right" isOpen={this.state.btnDropright} toggle={() => { this.setState({ btnDropright: !this.state.btnDropright }); }}>
                    <DropdownToggle caret>
                        <img src='../../../images/ic/more_vert/grey600.png'/>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
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
                        </DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
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