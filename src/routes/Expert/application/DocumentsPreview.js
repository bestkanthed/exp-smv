import React from 'react'
import DocumentPreview from './DocumentPreview';

const DocumentsPreview = ({ documents, idCustomer }) => {
    let documentFile;
    return (
        <div class='documents-preview'>
            {
                documents ?
                documents.map(document => <DocumentPreview idCustomer={idCustomer} document={document} key={document._id}/>) :
                <h2> Error connecting the server </h2>
            }
        </div>
    )
}

export default DocumentsPreview