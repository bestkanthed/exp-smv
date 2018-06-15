import React from 'react'
import DocumentPreview from './DocumentPreview';
import './Application.scss';

const DocumentsPreview = ({ documents, idCustomer }) => {
    return (
        <div class='documents-preview row'>
            {
                documents ?
                documents.map(document => 
                <div style={{marginRight:'150px', marginBottom:'30px'}} key={document._id} class='col-lg-1'>
                    <DocumentPreview key={document._id} idCustomer={idCustomer} document={document} />
                </div>) :
                <h2> Error connecting the server </h2>
            }
        </div>
    )
}

export default DocumentsPreview