import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { uploadFile, changeDocumentCategory, deleteDocument, fileTypeRejected } from '../../../actions/expert'

import Dropzone from 'react-dropzone'
import PdfViewer from '../../../components/utilities/PdfViewer'

import './Application.scss';

const documentsOrder = [
    'Mandatory Documents',
    'Forms & Letters',
    'Travel Proofs',
    'Financial Documents',
    'Occupation Proofs',
    'Others'
]

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
    deleteDocument: idDocument => dispatch(deleteDocument(idDocument)),
    fetchDocument: idDocument => dispatch(fetchDocument(idDocument))
})

class DocumentPreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false, 
        }
        this.toggle = this.toggle.bind(this);
        this.select = this.select.bind(this);
    }

    toggle() {
        this.setState({isOpen: !this.state.isOpen });
    }

    select (event) {
        //this.setState({category: event.target.innerText})
        changeDocumentCategory(event.target.innerText, this.props.document._id);
    }



    render() {
        let category
        let { uploadFiles, changeDocumentCategory, deleteDocument, idCustomer } = this.props
        let document = this.props.document
        console.log('this the docxxxxxxxxx', document)
        let details
        console.log('This is the document object------------', document);
        return (
            <div>
                <p>{document.name}</p>
                
                {
                    document.previewFileName ?
                    <Link to={(idCustomer ? '/customer' : '/expert')+'/documents/'+document._id}>
                        {
                            (document.previewFileName.split('.').pop()).toLowerCase() === 'pdf' ?
                            <div>
                                <div class='pdf-view'>
                                <embed style={{width:'-webkit-fill-available'}} src={'https://drive.google.com/viewerng/viewer?embedded=true&url=test.stampmyvisa.com/api/expert/documents/'+document._id+'/preview'} alt='pdf'/>
                                    {/* <PdfViewer file={'/api/expert/documents/'+document._id+'/preview'} /> */}
                                </div>
                            </div> :
                            imageTypes.indexOf((document.previewFileName.split('.').pop()).toLowerCase()) !== -1 ?
                            <img  style={{height: '340px', width: '200px'}} src={'/api/expert/documents/'+document._id+'/preview'} /> :
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
                     
                       
                            <div>
                                {
                                    idCustomer ? null :
                                <div>
                                    Move to : <select name="category" id="category" ref = {node => { category = node }} defaultValue = {document.status}>
                                    { documentsOrder.map(category =>  <option key={category} value={category}>{category}</option> ) }
                                    </select> 
                               </div>
                                }
                            <div class='row' style={{paddingLeft:'13%'}}>
                            {
                                idCustomer ? null :
                                <button type='button' onClick = {() => changeDocumentCategory(category.value, document._id )} class="btn btn-primary col-lg-5"> Move </button>
                            }
                                
                                <button type='button' style={{marginLeft:'3%'}} onClick = {() => { if(confirm("Are you sure you want to delete")) deleteDocument(document._id)} } class="btn btn-primary col-lg-5"> Delete </button>

                            </div>
                        </div>
                    
                    </div>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(DocumentPreview)