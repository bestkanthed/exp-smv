import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { uploadFile, changeDocumentCategory, deleteDocument, fileTypeRejected, changeDocumentStatus } from '../../../actions/expert'

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
        if ( accpectedFileTypes.indexOf(extension) === -1 ) dispatch(fileTypeRejected())
        else dispatch(uploadFile(file, idDocument, idCustomer))
    }),
    changeDocumentStatus: (status, idDocument) => dispatch(changeDocumentStatus(status, idDocument)),
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
        changeDocumentCategory(event.target.innerText, this.props.document._id);
    }

    setEditable(name) {
        this.setState({...this.state, isEditable: !this.state.isEditable})
        console.log('this is the staetetetete', name.value)
    }

    render() {
        let category
        let { uploadFiles, changeDocumentCategory, deleteDocument, idCustomer, changeDocumentStatus } = this.props
        let document = this.props.document
        let details
        let name
        let docuName
        return (
            <div class='col-lg-3'>
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
                <span>{document.name}</span>
                <input type="file" onChange={e => uploadFiles([...e.target.files], document._id, idCustomer)} ref={ref => this.upload = ref} style={{ display: 'none' }} />
                <button onClick={() => this.upload.click()}>upload</button>
                <button onClick={() => { if(confirm("Are you sure you want to delete")) deleteDocument(document._id)}}>delete</button>
                {/*
                <Dropdown direction="right" isOpen={this.state.isOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        move
                    </DropdownToggle>
                    <DropdownMenu>
                        {
                            documentsOrder.map(category => <DropdownItem onClick={this.select}  key={category}>{category}</DropdownItem>)
                        }
                    </DropdownMenu>
                    </Dropdown>*/}
                {
                    <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Dropdown Example
                    <span class="caret"></span></button>
                    <ul class="dropdown-menu">
                      <li><a href="#">HTML</a></li>
                      <li><a href="#">CSS</a></li>
                      <li><a href="#">JavaScript</a></li>
                    </ul>
                  </div>
                }
                {
                    document.previewFileName ?
                    <Link to={(idCustomer ? '/customer' : '/expert')+'/documents/'+document._id}>
                        {
                            (document.previewFileName.split('.').pop()).toLowerCase() === 'pdf' ?
                            <div class='pdf-view'>
                                {/* <embed  src={'https://drive.google.com/viewerng/viewer?embedded=true&url=test.stampmyvisa.com/api/expert/documents/'+document._id+'/preview'} alt='pdf'/> */}
                                <PdfViewer file={'/api/expert/documents/'+document._id+'/preview'} />
                            </div> :
                            imageTypes.indexOf((document.previewFileName.split('.').pop()).toLowerCase()) !== -1 ?
                            <img  style={{height: '270px', maxWidth: '100%', borderRadius: '8px'}} src={'/api/expert/documents/'+document._id+'/preview'} /> :
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
                        <img src='../../../images/ic/chat_bubble/grey600.png'/>{JSON.stringify(document.comments.length)}
                        <span style={{marginLeft:'20%'}}>
                            Status: {
                                idCustomer?
                                document.status:
                                <select value={document.status}
                                onChange={(event) => changeDocumentStatus(event.target.value, document._id)}
                                style={{color:`${document.status==='To Be Reviewed'? '#f36b51':document.status==='Not Ok'? '#7ed321':'#4a4a4a'}`}}>
                                    <option value='To be Reviewed'>To be Reviewed</option>
                                    <option value='Perfect'>Perfect</option>
                                    <option value='Not Ok'>Not Ok</option>
                                </select>
                            }
                        </span>
                    </span>
                </div>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(DocumentPreview)