import React from 'react'
import DocumentPreview from './DocumentPreview';
import './Application.scss';

const DocumentsPreview = ({ documents, idCustomer }) => {
    let documentFile;
    return (
        <div class='documents-preview row'>
            {
                documents ?
<<<<<<< HEAD
                documents.map(document => <div style={{marginRight:'36px'}} key={document._id} class='col-lg-2'><DocumentPreview document={document} /></div>) :
=======
                documents.map(document => <DocumentPreview idCustomer={idCustomer} document={document} key={document._id}/>) :
>>>>>>> c431246fb661268a8ef16172cdb0cad1413498fd
                <h2> Error connecting the server </h2>
            }
        </div>
    )
}

export default DocumentsPreview