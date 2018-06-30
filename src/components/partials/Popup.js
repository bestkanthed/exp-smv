import React from 'react'
import { connect } from 'react-redux'

import Flash from './popup/Flash'

import GetStarted from '../forms/GetStarted'
import Signup from '../forms/Signup'
import Login from '../forms/Login'
import ChangePassword from '../forms/ChangePassword'

import CreateCustomerCumOrder from '../forms/CreateCustomerCumOrder'
import UploadDocument from '../forms/UploadDocument'
import ProcessOrder from '../forms/ProcessOrder'

import './partials.scss'

import { hidePopupDone, hidePopupStart } from '../../actions/popup'

function setPopupContent(content) {
    switch(content) {
        case 'Flash': return <Flash />
        
        case 'GetStarted': return <GetStarted />
        case 'Signup': return <Signup />
        case 'Login': return <Login />
        case 'ChangePassword': return <ChangePassword />

        case 'CreateCustomerCumOrder': return <CreateCustomerCumOrder />
        case 'UploadDocument': return <UploadDocument />
        case 'ProcessOrder': return <ProcessOrder />
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

class Popup extends React.Component {
    componentDidUpdate () {
        let { popup, hidePopup } = this.props
        let { content, display } = popup
        if( content === 'Flash' && display === true ) setTimeout(() => hidePopup(), 3000)
    }

    render () {
        let {popup, hidePopup} = this.props
        return (
            <div class="popup" style={{display: popup.display ? 'inline' : 'none'}}>
                <div id="cover" style={{background: popup.content === 'Flash' ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.8)'}} onClick = {() => hidePopup()}></div>
                <div id="popup-frame">
                    <div class="pop-up-bg" style = {popup.animation} style={{top: '80px'}}>
                        <div class="row">
                            <div class="cancel" onClick = {hidePopup}>✕</div>
                        </div>
                        {setPopupContent(popup.content)}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Popup)