import React, { Component } from 'react';
import PDFObject from 'pdfobject';

class PdfRender extends Component {
  componentDidMount() {
    const { pdfBlob } = this.props;
    PDFObject.embed(pdfBlob, '#pdf-viewer');
  }

  render() {
    return <div style={{height:'-webkit-fill-available', width:'-webkit-fill-available'}} id={'pdf-viewer'} />;
  }
}

// PdfRender.propTypes = {
//   pdfBlob: PropTypes.string.isRequired,
//   width: PropTypes.string,
//   height: PropTypes.string,
//   containerId: PropTypes.string,
// };

// PdfRender.defaultProps = {
//   width: '100%',
//   height: '100%',
//   containerId: 'pdf-viewer',
// };

export default PdfRender;