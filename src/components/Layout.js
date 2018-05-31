import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Popup from './partials/Popup'
import Header from './partials/Header'
import Footer from './partials/Footer'

import { fetchCountries, fetchPurposes } from '../actions/database'
import { fetchUser } from '../actions/user'
import { fetchLocation } from '../actions/location'

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: () => dispatch(fetchUser()),
        fetchLocation: () => dispatch(fetchLocation()),
        fetchCountries: () => dispatch(fetchCountries()),
        fetchPurposes: () => dispatch(fetchPurposes())
    }
}

class Layout extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.fetchUser()
        this.props.fetchLocation()
        this.props.fetchCountries()
        this.props.fetchPurposes()
    }

    render() {
        return (
            <div>
                <Popup />
                <Header />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Layout))