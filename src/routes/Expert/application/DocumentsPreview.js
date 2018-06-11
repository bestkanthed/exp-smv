import React from 'react'
import DocumentPreview from './DocumentPreview';
import './Application.scss';

const DocumentsPreview = ({ documents, idCustomer }) => {
    let documentFile;
    return (
        <div class='documents-preview row'>
            {
                documents ?
                documents.map(document => 
                <div style={{marginRight:'120px', marginBottom:'30px'}} key={document._id} class='col-lg-1'>
                    <DocumentPreview idCustomer={idCustomer} document={document} />
                </div>) :
                <h2> Error connecting the server </h2>
            }
        </div>
    )
}

export default DocumentsPreview