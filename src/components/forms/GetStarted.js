import React from 'react';
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { connect } from 'react-redux';
import './react-select.css'

import { setGetStartedCountry, setGetStartedPurpose } from '../../actions/customer'

const mapStateToProps = state => ({ 
    countries: state.database.countries.countries,
    getStarted: state.customer.getStarted
})

const mapDispatchToProps = dispatch => ({
    setGetStartedCountry: country => dispatch(setGetStartedCountry(country)),
    setGetStartedPurpose: purpose => dispatch(setGetStartedPurpose(purpose))
})


let GetStarted = ({countries, getStarted, setGetStartedCountry, setGetStartedPurpose}) => {
    return (
        <div class="row get-started-row">
            <div class="col-lg-5 form-image"><img src="/ops-app/images/go.png" width="100%" class="go"/></div>
            <div class="col-lg-7">
            <form method="POST" id="show_requirements_form" class="show-requirements">
                <input type="hidden" name="_csrf"/>
                <span>I am travelling to &nbsp;</span>
                <br/>
                <Select
                    name="country"
                    value={getStarted.country}
                    onChange={ country => setGetStartedCountry(country.value) }
                    options={ countries ? countries.map(country => ({value: country.name, label: country.name})) : []}
                />
                <br/>
                <span>&nbsp;for&nbsp;</span>
                <br/>
                <Select
                    name="purposes"
                    value={getStarted.purpose}
                    onChange={ purpose => setGetStartedPurpose(purpose.value) }
                    options = {
                        countries && getStarted.country ?
                        (countries.find(country => country.name === getStarted.country)).purposes.map(purpose => ({value: purpose.name, label: purpose.name})) :
                        []
                    }
                />
                <br/>
                <span>&nbsp;with&nbsp;</span>
                <br/>
                <span>&nbsp;Indian Passport&nbsp;</span>
                <div class="form-group show-req">
                <div class="col-sm-12">
                    <button id="show_requirements" disabled = { getStarted.purpose ? false : true } class="btn btn-primary show-requirements-button" onClick={e => e.preventDefault()}>
                        <Link to={'/requirements/'+getStarted.country+'/'+getStarted.purpose}>SHOW REQUIREMENTS</Link>
                    </button>
                </div>
                </div>
            </form>
            </div>
        </div>
    )
};

GetStarted = connect(mapStateToProps, mapDispatchToProps)(GetStarted);

export default GetStarted;