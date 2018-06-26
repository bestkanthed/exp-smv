import React from 'react'
import { connect } from 'react-redux';
import DocumentPreview from './DocumentPreview';

import Dropzone from 'react-dropzone'

import { postDocument } from '../../../actions/expert';

import './Application.scss';

const mapDispatchToProps = dispatch => {
    return {
        postDocument: document => dispatch(postDocument(document))
    }
}

const DocumentsPreview = ({ past, documents, idCustomer, category, idApplication, postDocument }) => {
    let name
    return (
        <div class='row'>
            {
                documents ?
                documents.documents.map(document => <DocumentPreview key={document._id} idCustomer={idCustomer} document={document} /> ) :
                null
            }
            {
                idCustomer ?
                null :
                past ?
                null :
                <div class='col-lg-3'>
                    <input placeholder='New Document' ref = {node => { name = node }}/>
                        <div onClick = {() => {
                            if(!name.value) return alert('Enter the name of the document')
                            postDocument({
                                idApplication,
                                name: name.value,
                                category,
                                status: 'Pending'
                            })
                            name.value = ''
                        }}>
                        <img src='../../../images/ic/addDoc.png' />
                        </div>
                    </div>
                }
                </div> 
    )
}

export default connect(null, mapDispatchToProps)(DocumentsPreview)