import React from 'react';
import { connect } from 'react-redux'
import CountryBanner from './result/CountryBanner';
import CountryRevise from './result/CountryRevise';
import Visas from './result/Visas';

import { setGetStartedCountry, setGetStartedPurpose } from '../actions/customer';

const mapDispatchToProps = dispatch => ({
    setGetStartedCountry : country => dispatch(setGetStartedCountry(country)),
    setGetStartedPurpose : purpose => dispatch(setGetStartedPurpose(purpose))    
})

class Result extends React.Component {
    
    componentWillMount () {
        let { match, setGetStartedCountry, setGetStartedPurpose } = this.props
        let { country, purpose } = match.params
        setGetStartedCountry(country)
        setGetStartedPurpose(purpose)
    }
    
    render () {
        return (
            <div>
                <CountryBanner/>
                <CountryRevise />
                <Visas/>
            </div>
        )
    }
};

export default connect(null, mapDispatchToProps)(Result)