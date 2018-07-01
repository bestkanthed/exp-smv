import React from 'react'
import { connect } from 'react-redux'

import { loadPopup } from '../actions/popup'

const mapDispatchToProps = dispatch => ({
    loadPopup : content => dispatch(loadPopup(content))
})

class Login extends React.Component {
    componentDidMount () {
        this.props.loadPopup('Login')
    }
    render () {
        return <div></div>
    }
}

export default connect(null, mapDispatchToProps)(Login)