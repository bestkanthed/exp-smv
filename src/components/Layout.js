import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Popup from './partials/Popup'
import Header from './partials/Header'
import Footer from './partials/Footer'
import SideBar from './partials/SideBar'
import SearchBar from './partials/SearchBar'

import { fetchCountries, fetchPurposes } from '../actions/database'
import { fetchUser } from '../actions/user'

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: () => dispatch(fetchUser()),
        fetchCountries: () => dispatch(fetchCountries()),
        fetchPurposes: () => dispatch(fetchPurposes())
    }
}

class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchUser()
        this.props.fetchCountries()
        this.props.fetchPurposes()
    }

    render() {
        return (
            <div style={{backgroundColor:'white'}}>
                <Popup />
                <div>
                    <div class={`${window.location.pathname.split('/')[2]==='documents'? '':'col-lg-3'}`} style={{position:'fixed', paddingLeft: 0}}>
                    {window.location.pathname.split('/')[2]==='documents'? null:<SideBar/>}
                    </div>
                    <div class={`${window.location.pathname.split('/')[2]==='documents'? '':'col-lg-8'}`} style={{marginLeft:`${window.location.pathname.split('/')[2]==='documents'? '0%':'25%'}`}}>
                    
                    {window.location.pathname.split('/')[2]==='documents'? null:<SearchBar/>}
                    {/*<Header />*/}
                    {this.props.children}
                    </div>
                </div>
                {/*<Footer />*/}
            </div>
        )
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Layout))