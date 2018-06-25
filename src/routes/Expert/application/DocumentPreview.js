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
                <p>
                {document.name}
                <span>
                <img style={{float:'right'}} src='../../../images/ic/ic/ic_drive_file_move_24px.png'/>
                </span>
                <span onClick={() => { if(confirm("Are you sure you want to delete")) deleteDocument(document._id)} }>
                <img style={{float:'right'}}  src='../../../images/ic/delete.png'/>
                </span>
                <span>
                <img style={{float:'right'}} src='../../../images/ic/ic/ic_edit_24px.png'/>
                </span>
                </p>
                {/*
                <ButtonDropdown direction="right" isOpen={this.state.isOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                Dropright
                </DropdownToggle>
                <DropdownMenu>
                    {
                        documentsOrder.map(category => <DropdownItem onClick={this.select}  key={category}>Move to:{category}</DropdownItem>
                        )
                    }
                </DropdownMenu>
                </ButtonDropdown> */}
                {
                    document.previewFileName ?
                    <Link to={(idCustomer ? '/customer' : '/expert')+'/documents/'+document._id}>
                        {
                            (document.previewFileName.split('.').pop()).toLowerCase() === 'pdf' ?
                            <div>
                                <div class='pdf-view'>
                                {/* <embed  src={'https://drive.google.com/viewerng/viewer?embedded=true&url=test.stampmyvisa.com/api/expert/documents/'+document._id+'/preview'} alt='pdf'/> */}
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
                    <span style={{backgroundColor:'#fafafa', margin:'20px', fontSize:'9px'}}><img src='../../../images/ic/chat_bubble/grey600.png'/>{` 2`}<span style={{marginLeft:'20%'}}>Status:{idCustomer? document.status:(
                    <select style={{width:'30%'}}>
                        <option value='To be Reviewed'>To be Reviewed</option>
                        <option value='Perfect'>Perfect</option>
                        <option value='Not Ok'>Not Ok</option>
                    </select>
                    //<Select name='Status' value='Status'  optionClassName={{width:'30px'}} onChange={(newOption) => {console.log('this is the new option that is slected000000', newOption.value)}} options={[{value:'To be Reviewed', label:'To be Reviewed'},{value:'Perfect', label:'Perfect'},{value:'Not Ok', label:'Not Ok'}]}/>
                )}</span></span>
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