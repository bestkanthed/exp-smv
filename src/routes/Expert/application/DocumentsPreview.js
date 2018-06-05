import React from 'react'
import DocumentPreview from './DocumentPreview';
import './Application.scss';

const DocumentsPreview = ({ documents }) => {
    let documentFile;
    return (
        <div class='documents-preview row'>
            {
                documents ?
                documents.map(document => <div style={{marginRight:'36px'}} key={document._id} class='col-lg-2'><DocumentPreview document={document} /></div>) :
                <h2> Error connecting the server </h2>
            }
        </div>
    )
}

export default DocumentsPreview