import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadPopup } from '../../actions/popup'
import { deleteFile } from '../../actions/expert'

import { fetchDocument, deleteDocument, changeDocumentStatus, fetchApplicationByIdDocument } from '../../actions/expert'

import Comments from './document/Comments'
import FilesView from './document/FilesView'

import './document/Document.scss';

const mapStateToProps = state => ({
    document: state.expert.document,
    application: state.expert.application
})

const mapDispatchToProps = dispatch => ({
    fetchDocument: idDocument => dispatch(fetchDocument(idDocument)),
    deleteDocument: idDocument => dispatch(deleteDocument(idDocument)),
    showUploadDocumentPopup: () => dispatch(loadPopup('UploadDocument')),
    changeDocumentStatus: (status, idDocument) => dispatch(changeDocumentStatus(status, idDocument)),
    deleteFile: idFile => dispatch(deleteFile(idFile)),
    fetchApplicationByIdDocument: idDocument => dispatch(fetchApplicationByIdDocument(idDocument))
})

class Document extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentFileIndex : 0
        };
       this.toggleNextFiles = this.toggleNextFiles.bind(this);
       this.togglePrevFiles = this.togglePrevFiles.bind(this)
    }

    toggleNextFiles() {
        // if (files.length >= this.state.currentFileIndex) {
        //     this.setState({currentFileIndex: currentFileIndex++})
        // } else {
        //     this.setState({currentFileIndex: 0})
        // }
        const files = this.props.document.document.files;
        console.log('-----------------------this is the currentIndex state', this.state.currentFileIndex);
        let fileIndex = this.state.currentFileIndex;
        fileIndex++;
        //console.log('these are the props',files)
        console.log('------------------------this is the fileIndex', fileIndex);
        fileIndex<files.length ? this.setState({currentFileIndex : fileIndex}) : 0;
        console.log('************************this is the currentIndex state', this.state.currentFileIndex);
    }

    togglePrevFiles(){
        const files = this.props.document.document.files;
        console.log('-----------------------this is the currentIndex state', this.state.currentFileIndex);
        let fileIndex = this.state.currentFileIndex;
        fileIndex--;
        //console.log('these are the props',files)
        console.log('------------------------this is the fileIndex', fileIndex)
        fileIndex >= 0 ? this.setState({currentFileIndex : fileIndex}) : 0;
        console.log('************************this is the currentIndex state', this.state.currentFileIndex);
    }

    componentWillMount() {
        let { fetchDocument, idDocument, fetchApplicationByIdDocument } = this.props
        fetchDocument(idDocument)
        let { application } = this.props.application
        if (!application) fetchApplicationByIdDocument(idDocument)
    }
    
    render() {
        
        let { idCustomer, showUploadDocumentPopup, changeDocumentStatus, fetchDocument, idDocument } = this.props
        let { fetching, fetched, document, rerender } = this.props.document
        let { application } = this.props.application
        console.log('Application object in the document view', application);
        if (rerender) fetchDocument(idDocument)
        return (
            <div class='document'>
                {
                    fetching ?
                    null :
                    fetched ?
                    document ?
                    <div class='document-page-view'>
                        <div class='document-header'style={{paddingLeft:'1%'}}>
                        <br/>
                            <div class='header-mask row'>
                            <Link to={application ? (idCustomer ? '/customer' : '/expert') + `/applications/${application._id }`: (idCustomer ? '/customer' : '/expert') +'/orders'}>
                            <div class='col-lg-1'>
                            <img src='../../../images/ic/arrow_back/grey600.png' />
                            </div>
                            </Link>
                                {
                                    application ?
                                    <div class='col-lg-2' >
                                        {application.name} - {application.country} - {application.visaType}
                                    </div> :
                                    null
                                }
                                <div class='col-lg-2'>
                                {document.category}
                                </div>
                                <div class='col-lg-2'>
                                {document.name === null ? 'doc' :`${document.name}`}
                                </div>
                                {
                                    application ? application.status === 'Past' ? null :
                                    <div class='col-lg-3'>
                                        <button class='button-mask-btn' style={{marginRight:'4px'}} onClick={() => showUploadDocumentPopup()}><img src='../../../images/ic/ic/ic_file_upload_24px.png' /> Upload </button>
                                        <button class='button-mask-btn' onClick={() => {
                                            if(confirm("Are you sure you want to delete"))
                                            {
                                                deleteFile(document.files[this.state.currentFileIndex]._id);
                                                document.files.length === 1 && application ?
                                                window.location.href = '/expert/applications/'+application._id:
                                                window.location.href = '/expert/documents/'+document._id
                                        }}}><img src='../../../images/ic/ic/ic_edit_24px.png' /> Delete </button>
                                    </div> : null
                                }
                                <div class='col-lg-2'>
                                {
                                    idCustomer ?
                                    null :
                                    application ? application.status === 'Past' ? null :
                                    <div>
                                        <button onClick={()=> changeDocumentStatus("Perfect", document._id)} style={{color: document.status === 'Perfect' ? 'green' : 'grey', backgroundColor:'#1ddaae' }}> Perfect </button>
                                        <button onClick={()=> changeDocumentStatus("Not OK", document._id)} style={{color: document.status === 'Not OK' ? 'red' : 'grey' }}> Not OK </button>
                                    </div> : null
                                }
                                </div>
                            </div>
                            <br/>
                        </div>
                        <div class='row'>
                            <div>   
                                <div class='col-lg-8' style={{height: '75vh'}}>
                                    <div style={{backgroundColor:'#4A4A4A', color:'white', textAlign:'center', verticalAlign:'middle',marginLeft:'-2.4%', marginRight:'-2.38%', padding:'1%'}}>{`${this.state.currentFileIndex + 1}/${document.files.length}`}</div>
                                    <div class='row' style={{backgroundColor:'#4A4A4A'}}>
                                        <div class='col-lg-1' style={{backgroundColor:'#4A4A4A', height:'75vh', color:'white', position:'relative'}} onClick={this.togglePrevFiles}><p style={{position:'relative', top:'45%'}}>Prev doc</p></div>
                                        <div class='col-lg-10' style={{backgroundColor:'#4A4A4A'}}>
                                        <FilesView idCustomer={idCustomer} files={document.files[this.state.currentFileIndex]} idDocument={document._id}/>
                                        </div>
                                        <div class='col-lg-1' style={{backgroundColor:'#4A4A4A', height:'75vh', color:'white'}} onClick={this.toggleNextFiles}><p style={{position:'relative', top:'45%'}}>Next doc</p></div>
                                    </div>
                                    <div style={{backgroundColor:'#4A4A4A', color:'white', textAlign:'center', verticalAlign:'middle',marginLeft:'-2.4%', marginRight:'-2.38%', padding:'1%'}}>{`${this.state.currentFileIndex + 1}/${document.files.length}`}</div>
                                </div>
                            </div>
                            <div class='col-lg-4'>
                                <Comments idCustomer={idCustomer} past={application ? application.status === 'Past' : undefined} comments={document.comments} idDocument={document._id}/>
                            </div>
                        </div>
                    </div> :
                    null :
                    <h2>Error connecting to the server</h2>
                }
                {console.log('These are the props',this.props)}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Document)