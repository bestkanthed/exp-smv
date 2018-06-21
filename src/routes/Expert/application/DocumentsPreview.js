import React from 'react'
import { connect } from 'react-redux';
import DocumentPreview from './DocumentPreview';

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
        <div class='documents-preview row'>
            {
                documents ?
                documents.documents.map(document => 
                <div style={{marginRight:'150px', marginBottom:'30px'}} key={document._id} class='col-lg-1'>
                    <DocumentPreview key={document._id} idCustomer={idCustomer} document={document} />
                </div>) :
                null
            }
            {
                idCustomer ?
                null :
                past ?
                null :
                <div>
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
                    }}> ++++++++++++++++++++++++++++++++ </div>
                </div>
            }
        </div>
    )
}

export default connect(null, mapDispatchToProps)(DocumentsPreview)