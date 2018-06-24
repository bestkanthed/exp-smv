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
        <span style={{display:'inline-block'}} >
            {
                documents ?
                documents.documents.map(document => 
                <span style={{display : 'inline-block', margin:'1%'}} key={document._id}>
                    <DocumentPreview key={document._id} idCustomer={idCustomer} document={document} />
                </span>) :
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
                    }}>
                        <img src='../../../images/ic/noun_1784458_cc.png' />
                        </div>
                    </div>
                }
                </span> 
    )
}

export default connect(null, mapDispatchToProps)(DocumentsPreview)