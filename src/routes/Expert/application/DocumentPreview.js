import React from 'react'
import Select from 'react-select'
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
            isEditable: true 
        }
        this.toggle = this.toggle.bind(this);
        this.select = this.select.bind(this);
        this.setEditable = this.setEditable.bind(this);
        this.editDocName = this.editDocName.bind(this);
    }

    toggle() {
        this.setState({isOpen: !this.state.isOpen });
    }

    select (event) {
        //this.setState({category: event.target.innerText})
        changeDocumentCategory(event.target.innerText, this.props.document._id);
    }

    editDocName(event) {
        console.log('==========@@@@@@@@@==========',this.state.isEditable)
        this.state.isEditable? 
        console.log('nope'):
        console.log('this is the docu name', event.target.value)
    }

    setEditable(name) {
        this.setState({...this.state, isEditable: !this.state.isEditable})
        console.log('this is the staetetetete', name.value)
    }

    render() {
        let { uploadFiles, changeDocumentCategory, deleteDocument, idCustomer } = this.props
        let document = this.props.document
        console.log('this the docxxxxxxxxx', document)
        let details
        let name
        let docuName
        console.log('This is the document object------------', document);
        return (
            <div>
                <div style={{display:'inline'}}>
                    <input style={{display:'none'}} defaultValue={document.name} onChange={this.editDocName} placeholder={document.name} ref={node =>{docuName=node}} autoFocus/>
                    <div>
                        <span ref={node => {name = node}}>{document.name}</span>
                        {
                            idCustomer? null : 
                        <span>
                            <div style={{display:'inline-block'}}>
                                <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                                    <DropdownToggle>
                                <img src='../../../images/ic/ic/ic_drive_file_move_24px.png'/>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <div class='dropDownItem'>Move this Document to...</div>
                                        {documentsOrder.map(category => {
                                            return (
                                                <div class='dropDownItem' key={category} onClick={(event) => {changeDocumentCategory(category, document._id ); this.toggle()}}>
                                                    {category}
                                                </div>
                                            )
                                        })}
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        
                            <div style={{display:'inline-block'}} onClick={() => { if(confirm("Are you sure you want to delete")) deleteDocument(document._id)} }>
                                <img src='../../../images/ic/delete.png'/>
                            </div>
                        
                            <div style={{display:'inline-block'}} onClick={() => {this.setEditable(docuName);docuName.style.display=`${this.state.isEditable? 'inline':'none'}`; name.style.display=`${this.state.isEditable? 'none':'inline'}`}}>
                                <img src='../../../images/ic/ic/ic_edit_24px.png'/>
                            </div>
                        </span>
                        }
                    </div>
                </div>
                {
                    document.previewFileName ?
                    <Link to={(idCustomer ? '/customer' : '/expert')+'/documents/'+document._id}>
                        {
                            (document.previewFileName.split('.').pop()).toLowerCase() === 'pdf' ?
                            <div>
                                <div class='pdf-view'>
                                    <PdfViewer file={'/api/expert/documents/'+document._id+'/preview'} />
                                </div>
                            </div> :
                            imageTypes.indexOf((document.previewFileName.split('.').pop()).toLowerCase()) !== -1 ?
                            <img  style={{height: '270px', width: '200px',borderRadius:'4px'}} src={'/api/expert/documents/'+document._id+'/preview'} /> :
                            <a href={'/api/expert/documents/'+document._id+'/preview'}>{document.previewFileName}</a>
                        }
                    </Link> :
                    <div>
                    <Dropzone style={{height:'270px', backgroundColor:'#eceff1'}} onDrop={files => uploadFiles(files, document._id, idCustomer)}>
                        <p style={{position:'relative', top:'40%', left:'20%', color:'#4a4a4a'}}>Click here to  add files</p>
                    </Dropzone>
                    </div>
                }
                <div class='details-mask' style={{position:'relative',zIndex:'1', top:'-40px', height:'40px',backgroundColor:'#fafafa'}}>
                    {/* <span class='col-lg-6' onClick={()=>{details.style.display='block'}}>Show</span>
                    <span class='col-lg-6' onClick={()=>{details.style.display='none'}}>Hide</span> */}
                    <span style={{backgroundColor:'#fafafa', margin:'20px', fontSize:'9px'}}>
                    <img src='../../../images/ic/chat_bubble/grey600.png'/>{` 2`}
                    <span style={{marginLeft:'20%'}}>Status:</span>
                    <span style={{color:`${document.status==='To Be Reviewed'? '#f36b51':document.status==='Not Ok'? '#7ed321':'#4a4a4a'}`}}>{document.status}</span>
                </span>
                    </div>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(DocumentPreview)