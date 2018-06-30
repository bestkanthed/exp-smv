import React, { Component, PropTypes } from 'react';
import PDFObject from 'pdfobject';

class PdfRender extends Component {
  componentDidMount() {
    const { pdfBlob, containerId } = this.props;

    PDFObject.embed(pdfBlob, `#${containerId}`);
  }

  render() {
    const { width, height, containerId } = this.props;

    return <div style={{ width:'100%', height:'100%' }} id={'pdf-viewer'} />;
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