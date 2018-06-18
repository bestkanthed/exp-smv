import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadPopup } from '../../actions/popup'
import { deleteFile } from '../../actions/expert'

import { fetchDocument, deleteDocument, changeDocumentStatus, fetchApplicationByIdDocument } from '../../actions/expert'

import Comments from './document/Comments'
import FilesView from './document/FilesView'
import Switch from 'react-switch'

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
                            <Link to='/expert/applications/'>
                            <div class='col-lg-2'><img src='../../../images/ic/arrow_back/grey600.png' /></div>
                            </Link>
                                {
                                    application ?
                                    <div class='col-lg-2'>
                                        {application.name} - {application.country} - {application.visaType}
                                    </div> :
                                    null
                                }
                                <div class='col-lg-2'>
                                {document.category}
                                </div>
                                <div class='col-lg-5'>
                                {document.name===null ? 'doc' :`${document.name}`}
                                </div>
                                <div class='col-lg-3'>
                                <button class='button-mask-btn' style={{marginRight:'4px'}} onClick={() => showUploadDocumentPopup()}> Upload </button>
                                <button class='button-mask-btn' onClick={() => deleteFile(document.files[0]._id) }> Delete </button>
                                </div>
                                <div class='col-lg-1'>
                                {
                                    idCustomer ?
                                    null :
                                    <Switch
                                        onChange={status => changeDocumentStatus(status ? "Perfect" : "NOT OKAY", document._id)}
                                        checked={document.status === "Perfect" ? true : false}
                                        id="status-switch"
                                    />
                                }
                                </div>
                            </div>
                            <br/>
                        </div>
                        <div class='row'>
                            <div>   
                                <button onClick={this.toggleNextFiles}>next doc</button>
                                <button onClick={this.togglePrevFiles}>prev doc</button>
                                <p>{`${this.state.currentFileIndex + 1}/${document.files.length}`}</p>
                                    <div class='col-lg-7 pdf-border'>
                                    <FilesView idCustomer={idCustomer} files={document.files[this.state.currentFileIndex]} idDocument={document._id}/>
                                    </div>
                            </div>
                            <div class='col-lg-5'>
                                <Comments idCustomer={idCustomer} comments={document.comments} idDocument={document._id}/>
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