import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { updateDocument, uploadFile, changeDocumentCategory, deleteDocument, fileTypeRejected, changeDocumentStatus, seenComments } from '../../../actions/expert'

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
    updateDocument: document => dispatch(updateDocument(document)),
    changeDocumentStatus: (status, idDocument) => dispatch(changeDocumentStatus(status, idDocument)),
    changeDocumentCategory: (category, idDocument) => dispatch(changeDocumentCategory(category, idDocument)),
    deleteDocument: idDocument => dispatch(deleteDocument(idDocument)),
    fetchDocument: idDocument => dispatch(fetchDocument(idDocument)),
    seenComments: idDocument => dispatch(seenComments(idDocument)),
})

const mapStateToProps = state => ({
    user: state.user.user
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
    }

    toggle() {
        this.setState({isOpen: !this.state.isOpen });
    }

    select (event) {
        changeDocumentCategory(event.target.innerText, this.props.document._id);
    }

    render() {
        let category
        let { user, uploadFiles, updateDocument, changeDocumentCategory, deleteDocument, idCustomer, changeDocumentStatus, seenComments } = this.props
        let document = this.props.document
        let name
        let docuName
        return (
            <div class='col-lg-3'>
                <input style={{display:'none'}} defaultValue={document.name} placeholder={document.name} ref={node =>{docuName=node}} autoFocus/>
                <div>
                    <Link class='preview-docname' to={(idCustomer ? '/customer' : '/expert')+'/documents/'+document._id} onClick={() => seenComments(document._id)}>
                        <span ref={node => {name = node}}>{document.name}</span>
                    </Link>
                    {
                        idCustomer? null : 
                    <span style={{float:'right'}}>
                        <div style={{display:'inline-block'}}>
                            <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                                <DropdownToggle style={{backgroundColor: 'white', boxShadow: 'none', paddingRight: 0}}>
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
                    
                        <div class='application-icon' onClick={() => { if(confirm("Are you sure you want to delete")) deleteDocument(document._id)} }>
                            <img src='../../../images/ic/delete.png'/>
                        </div>
                    
                        <div class='application-icon' onClick={() => {
                            if(!this.state.isEditable) {
                                if(!docuName.value) return alert('Document name cannot be empty')
                                name.innerText = docuName.value
                                updateDocument({
                                    _id: document._id,
                                    name: docuName.value
                                })
                            }
                            this.setState({...this.state, isEditable: !this.state.isEditable});
                            docuName.style.display=`${this.state.isEditable? 'inline':'none'}`;
                            name.style.display=`${this.state.isEditable? 'none':'inline'}`
                        }}>
                            <img class='black' src='../../../images/ic/ic/ic_edit_24px.png'/>
                        </div>
                        <div class='application-icon' onClick={() => this.upload.click()}>
                            <img class='black' src='../../../images/ic/ic/ic_file_upload_24px.png'/>
                            <input type="file" onChange={e => uploadFiles([...e.target.files], document._id, idCustomer)} ref={ref => this.upload = ref} style={{ display: 'none' }} />
                        </div>
                    </span>
                    }
                </div>
                {
                    document.previewFileName ?
                    (document.previewFileName.split('.').pop()).toLowerCase() === 'pdf' ?
                    <div class='pdf-view' onMouseUp={() => console.log('embed clicked')}>
                        {/*<embed type="application/pdf" style={{height: '260px', maxWidth: '100%'}} src={'/api/expert/documents/'+document._id+'/preview'} alt='pdf' />*/}
                        <embed style={{height: '270px', maxWidth: '100%'}} src={'https://drive.google.com/viewerng/viewer?embedded=true&url=test.stampmyvisa.com/api/expert/documents/'+document._id+'/preview'} alt='pdf' />
                    </div> :
                    imageTypes.indexOf((document.previewFileName.split('.').pop()).toLowerCase()) !== -1 ?
                    <img style={{height: '270px', maxWidth: '100%', borderRadius: '8px'}} src={'/api/expert/documents/'+document._id+'/preview'} /> :
                    <a href={'/api/expert/documents/'+document._id+'/preview'}>{document.previewFileName}</a> :
                    <div>
                        <Dropzone style={{height:'270px', backgroundColor:'#eceff1'}} onDrop={files => uploadFiles(files, document._id, idCustomer)}>
                            <p style={{position:'relative', top:'40%', left:'20%', color:'#4a4a4a'}}>Click here to  add files</p>
                        </Dropzone>
                    </div>
                }

                <div class='details-mask' style={{position:'relative',zIndex:'1', height:'40px',backgroundColor:'#fafafa'}}>
                    {/* <span class='col-lg-6' onClick={()=>{details.style.display='block'}}>Show</span>
                    <span class='col-lg-6' onClick={()=>{details.style.display='none'}}>Hide</span> */}
                    <span style={{backgroundColor:'#fafafa', margin:'20px', fontSize:'9px'}}>
                        {
                            user ?
                            document.comments.find(comment => comment.idSeenBy.indexOf(user._id) === -1) ?
                            <img class='red' src='../../../images/ic/chat_bubble/grey600.png'/> :
                            <img src='../../../images/ic/chat_bubble/grey600.png'/> :
                            null
                        }
                        { document.comments.length }
                        <span style={{marginLeft:'20%'}}>
                            Status: {
                                idCustomer?
                                document.status:
                                <select value={document.status}
                                onChange={(event) => changeDocumentStatus(event.target.value, document._id)}
                                style={{color:`${document.status==='To Be Reviewed' ? '#4a4a4a' : (document.status==='Not OK' ? '#f36b51': '#7ed321')}`}}>
                                    <option style={{color:'#4a4a4a'}} value='To Be Reviewed'>To Be Reviewed</option>
                                    <option style={{color:'#7ed321'}} value='Perfect'>Perfect</option>
                                    <option style={{color:'#f36b51'}} value='Not OK'>Not OK</option>
                                </select>
                            }
                        </span>
                    </span>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentPreview)