import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Viewer } from 'react-viewer'

import { deleteFile } from '../../../actions/expert'

import Dropzone from 'react-dropzone'
import PdfViewer from '../../../components/utilities/PdfViewer'

const imageTypes = [
    'jpeg',
    'jpg',
    'png'
]

const mapDispatchToProps = dispatch => ({ deleteFile: idFile => dispatch(deleteFile(idFile)) })

class FilesView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible : false
        }
    }

    render() {
        let {idCustomer, files, idDocument, fetchDocument, deleteFile} = this.props
        return (
            <div>
                {
                    // files.map(file =>
                        files ?
                        <div key={files._id}>
                            {
                                (files.uploadName.split('.').pop()).toLowerCase() === 'pdf' ?
                                //<PdfViewer file={'/api/expert/files/'+files._id} /> :
                                <embed  src={'/api/expert/files/'+files._id} alt='pdf'/> :
                                imageTypes.indexOf((files.uploadName.split('.').pop()).toLowerCase()) !== -1 ?
                                <img style={{height:'50%', width:'50%'}} src={'/api/expert/files/'+files._id} /> :
                                //<div><button onClick={() => { this.setState({ visible: !this.state.visible }); } }>show</button><Viewer visible={this.state.visible} images={'/api/expert/files/'+this.props.files._id} zoomable={true} onClose={() => {this.setState({visible : ! this.state.visible})}}/> </div>:
                                <a href={'/api/expert/files/'+files._id}>{files.uploadName}</a>
                            }
                        </div> : 
                        null
                    //)
                }
            </div>
        );

    }

}

export default connect(null, mapDispatchToProps)(FilesView) 

// import React from 'react'
// import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { Viewer } from 'react-viewer'

// import { deleteFile } from '../../../actions/expert'

// import Dropzone from 'react-dropzone'
// import PdfViewer from '../../../components/utilities/PdfViewer'


// const imageTypes = [
//     'jpeg',
//     'jpg',
//     'png'
// ]

// const mapDispatchToProps = dispatch => ({ deleteFile: idFile => dispatch(deleteFile(idFile)) })

// class FilesView extends React.Component {
//     constructor (props) {
//         super(props);

//         this.state = {
//             visible : true
//         }
//     }

//     render() {
//         return (
//         <div>
//         {
//             // files.map(file =>
//                 <div key={this.props.files._id}>
//                     {
//                         (this.props.files.uploadName.split('.').pop()).toLowerCase() === 'pdf' ?
//                         <PdfViewer file={'/api/expert/files/'+this.props.files._id} /> :
//                         imageTypes.indexOf((this.props.files.uploadName.split('.').pop()).toLowerCase()) !== -1 ?
//                         //<img style={{height:'60%', width:'50%'}} src={'/api/expert/files/'+files._id} /> :
//                         <Viewer visible={true} images={'/api/expert/files/'+this.props.files._id} zoomable={true} onClose={() => {this.setState({visible : ! this.state.visible})}}/> :
//                         <a href={'/api/expert/files/'+this.props.files._id}>{this.props.files.uploadName}</a>
//                     }
//                 </div>
//             //)
//         }
//     </div>
//     )
//         }
//     }

// export default connect(null, mapDispatchToProps)(FilesView)