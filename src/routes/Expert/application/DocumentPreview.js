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
    'png',
    'pdf'
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

function setDocImg(name = '') {
    switch(name) {
        case 'doc' : return '../../../ops-app/images/ic/ic/word.png';
        case 'docx' : return '../../../ops-app/images/ic/ic/word.png';
        case 'xls' : return '../../../ops-app/images/ic/ic/excel_icon.png';
        case 'xlsx' : return '../../../ops-app/images/ic/ic/excel_icon.png';
    }
}

class DocumentPreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isEditable: true, 
            hoverMove:false,
            hoverDelete: false,
            hoverEdit:false,
            hoverUpload:false
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

    setEditable(name) {
        this.setState({...this.state, isEditable: !this.state.isEditable})
        
    }

    render() {
        let category
        let { user, uploadFiles, updateDocument, changeDocumentCategory, deleteDocument, idCustomer, changeDocumentStatus, seenComments } = this.props
        let document = this.props.document
        let name
        let docuName
        return (
            <div class='col-lg-4'>
                <input class='invisible-input' defaultValue={document.name} placeholder={document.name} ref={node =>{docuName=node}} autoFocus/>
                <div>
                    <Link class='preview-docname' to={(idCustomer ? '/customer' : '/expert')+'/documents/'+document._id} onClick={() => seenComments(document._id)}>
                        <span ref={node => {name = node}}>{document.name}</span>
                    </Link>
                    {
                        idCustomer? null : 
                        <span>
                            <div style={{display:'inline-block'}}>
                                <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                                    <DropdownToggle onMouseEnter={() => this.setState({...this.state, hoverDelete:false,hoverUpload:false,hoverEdit:false, hoverMove:true})} onMouseLeave={() => this.setState({...this.state, hoverMove:false})} style={{backgroundColor: 'white', boxShadow: 'none', paddingRight: 0}}>
                                        <div class={`${this.state.hoverMove? 'show-tooltip':'hide-tooltip'}`}>Move</div>
                                        <img src='../../../ops-app/images/ic/ic/ic_drive_file_move_24px.png'/>
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
                            <div class='application-icon' onMouseEnter={() => this.setState({...this.state,hoverEdit:false,hoverMove:false,hoverUpload:false ,hoverDelete:true})} onMouseLeave={() => this.setState({...this.state,hoverDelete:false})}  onClick={() => { if(confirm("Are you sure you want to delete")) deleteDocument(document._id)} }>
                            <div class={`${this.state.hoverDelete? 'show-tooltip':'hide-tooltip'}`}>delete</div>
                                <img src='../../../ops-app/images/ic/delete.png'/>
                            </div>
                            <div class='application-icon' onMouseEnter={() => this.setState({...this.state,hoverMove:false, hoverDelete:false,hoverUpload:false,hoverEdit:true})} onMouseLeave={() => this.setState({...this.state, hoverEdit:false})} onClick={() => {
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
                            <div class={`${this.state.hoverEdit? 'show-tooltip':'hide-tooltip'}`}>Edit</div>
                                <img class='black' src='../../../ops-app/images/ic/ic/ic_edit_24px.png'/>
                            </div>
                            <div class='application-icon' onMouseEnter={() => this.setState({...this.state,hoverEdit:false, hoverMove:false, hoverUpload:true, hoverDelete:false})} onMouseLeave={() => this.setState({...this.state, hoverUpload:false})} onClick={() => this.upload.click()}>
                                <div class={`${this.state.hoverUpload? 'show-tooltip':'hide-tooltip'}`}>upload</div>
                                <img class='black' src='../../../ops-app/images/ic/ic/ic_file_upload_24px.png'/>
                                <input type="file" onChange={e => uploadFiles([...e.target.files], document._id, idCustomer)} ref={ref => this.upload = ref} style={{ display: 'none' }} />
                            </div>
                        </span>
                    }
                </div>
                {
                    document.previewFileName ?
                    <Link to={(idCustomer ? '/customer' : '/expert')+'/documents/'+document._id} onClick={() => seenComments(document._id)}>
                        {
                            imageTypes.indexOf((document.previewFileName.split('.').pop()).toLowerCase()) !== -1 ?
                            <img style={{height: '270px', width: '200px',borderRadius:'4px'}} src={'/api/expert/documents/'+document._id+'/preview'} /> :
                            <a href={'/api/expert/documents/'+document._id+'/preview'}><div class='pdf-view'><img style={{position:'relative', top:'37%', left:'37%'}} src={`${setDocImg(document.previewFileName.split('.')[1])}`} />{document.previewFileName}</div></a>
                        }
                    </Link> :
                    <div>
                    <Dropzone style={{height:'270px', width:'200px',backgroundColor:'#eceff1', borderRadius:'8px'}} onDrop={files => uploadFiles(files, document._id, idCustomer)}>
                        <p style={{position:'relative', top:'40%', left:'20%', color:'#4a4a4a'}}>Click here to  add files</p>
                    </Dropzone>
                    </div>
                }
                <div class='details-mask' style={{position:'relative',zIndex:'1', top:'-40px', height:'40px', width:'200px',backgroundColor:'#fafafa'}}>
                    {/* <span class='col-lg-6' onClick={()=>{details.style.display='block'}}>Show</span>
                    <span class='col-lg-6' onClick={()=>{details.style.display='none'}}>Hide</span> */}
                    <span style={{backgroundColor:'#fafafa', margin:'20px', fontSize:'9px'}}>
                        {
                            user ?
                            document.comments.find(comment => comment.idSeenBy.indexOf(user._id) === -1) ?
                            <img class='red' src='../../../ops-app/images/ic/chat_bubble/grey600.png'/> :
                            <img src='../../../ops-app/images/ic/chat_bubble/grey600.png'/> :
                            null
                        }
                        { document.comments.length }
                        <span> Status:
                            {' '}{
                                idCustomer ?
                                document.status :
                                <select value={document.status}
                                onChange={(event) => changeDocumentStatus(event.target.value, document._id)}
                                style={{color:`${ (document.status==='To Be Reviewed' || document.status==='Pending') ? '#4a4a4a' : (document.status==='Not OK' ? '#f36b51': '#7ed321')}`}}>
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