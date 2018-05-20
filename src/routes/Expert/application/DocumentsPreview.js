import React from 'react'
import { Link } from 'react-router-dom'

import PdfViewer from '../../../components/utilities/PdfViewer'

const mapDispatchToProps = dispatch => ({ documentfilter})

/**
 * The link to documnet.id will only be acessible by respective visa expert and customer
 */

const DocumentsPreview = ({ documents }) => {
    return (
        <div class='documents-preview'>
            {
                documents ?
                documents.map(document => 
                    <Link to={'/expert/document/'+document.id} key={document.id}>
                        <p>{document.name}</p>
                        <PdfViewer file={'/refund-and-cancellation-policy.pdf'} />
                        <p>{document.unseenComments}</p>
                        <p>{document.status}</p>
                    </Link>
                ) :
                <h2> Error connecting the server </h2>
            }
        </div>
    )
}

export default DocumentsPreview