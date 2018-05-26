import React from 'react'
import { connect } from 'react-redux'

import Flash from './popup/Flash'
import Login from '../forms/Login'

import CreateCustomerCumOrder from '../forms/CreateCustomerCumOrder'

import UploadDocument from '../forms/UploadDocument'

import { hidePopupDone, hidePopupStart } from '../../actions/popup'

function setPopupContent(content) {
    switch(content) {
        case 'Flash': return <Flash />
        case 'Login': return <Login />

        case 'CreateCustomerCumOrder': return <CreateCustomerCumOrder />
        
        case 'UploadDocument': return <UploadDocument />
        default: return null
    }
}

const mapStateToProps = state => {
  return {
    popup : state.popup
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hidePopup : () => {
        dispatch(hidePopupStart())
        setTimeout(() => {
           dispatch(hidePopupDone())
        }, 400)
    }
  }
}

const Popup = ({popup, children, hidePopup}) => {
    return (
        <div class="popup" style={{display: popup.display ? 'inline' : 'none'}}>
            <div id="cover" onClick = {() => hidePopup()}></div>
            <div id="popup-frame">
                <div class="center-div" style = {popup.animation}>
                    <div class="row">
                        <div class="cancel" onClick = {hidePopup}>✕</div>
                    </div>
                    {setPopupContent(popup.content)}
                </div>
            </div>
        </div>
    )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Popup)