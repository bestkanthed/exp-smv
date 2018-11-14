import React from 'react'
import { connect } from 'react-redux'
import "../../styles/css/imageViewer.css"

class ImageViewer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      rotateDegree: 0
    }
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.rotate = this.rotate.bind(this);
  }

  handleHover(){
      this.setState({
          isHovered: !this.state.isHovered
      });
  }

  zoomIn(){
    let docImage = document.getElementById('documentImage'),
      currWidth = docImage.clientWidth,
      currHeight = docImage.clientHeight
    docImage.style.width = (currWidth + 50) + 'px';
    docImage.style.height = (currHeight + 50) + 'px';
  }

  zoomOut() {
     let docImage = document.getElementById('documentImage'),
      currWidth = docImage.clientWidth,
      currHeight = docImage.clientHeight;
    if(currWidth>200) {
      docImage.style.width = (currWidth - 50) + "px";
    }
    if(currHeight>80) {
      docImage.style.height = (currWidth - 50) + "px";
    }
  }

  rotate() {
    this.setState({
          rotateDegree: (this.state.rotateDegree + 90) % 360
      });
  }

  render() {
    let {filePath} = this.props;
    const zoomClass = this.state.isHovered ? "displayZoom" : "",
      rotateClass = this.state.rotateDegree ? 'rotate-image'+this.state.rotateDegree : '';
      return (
      <div class='viewer'
            onMouseEnter={this.handleHover} 
            onMouseLeave={this.handleHover}>  
        <img id='documentImage' class={'image-view '+rotateClass}
            src={filePath} />
      <img class={'rotate '+zoomClass}
            src='/ops-app/images/ic/imageViewer/baseline-rotate-right.svg' 
            onClick={this.rotate}/>            
      <img className={'zoom-in '+zoomClass} 
            src='/ops-app/images/ic/imageViewer/baseline-zoom-in.svg' 
            onClick={this.zoomIn}/>
      <img class={'zoom-out '+zoomClass}
            src='/ops-app/images/ic/imageViewer/baseline-zoom-out.svg' 
            onClick={this.zoomOut}/>
    </div>     

    )
  }
}

module.exports = ImageViewer
