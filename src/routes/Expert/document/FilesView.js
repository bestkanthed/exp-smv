import React from 'react'
import { connect } from 'react-redux'

import { deleteFile } from '../../../actions/expert'

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
        let pdff
        return (
            <div>
                {
                    // files.map(file =>
                        files ?
                        <div  id='pdf' key={files._id} ref={node => {pdff = node}}>
                            {
                                (files.uploadName.split('.').pop()).toLowerCase() === 'pdf' ?
                                <embed style={{height:'-webkit-fill-available', width:'-webkit-fill-available'}} type='application/pdf' src={'/api/expert/files/'+files._id} alt='pdf'/> :
                                imageTypes.indexOf((files.uploadName.split('.').pop()).toLowerCase()) !== -1 ?
                                <img style={{height:'75vh', width:'48vw', position:'relative', left:'-1%'}} src={'/api/expert/files/'+files._id} /> :
                                //<div><button onClick={() => { this.setState({ visible: !this.state.visible }); } }>show</button><Viewer visible={this.state.visible} ops-app/images={'/api/expert/files/'+this.props.files._id} zoomable={true} onClose={() => {this.setState({visible : ! this.state.visible})}}/> </div>:
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
