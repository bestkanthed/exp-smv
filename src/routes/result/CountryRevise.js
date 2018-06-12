import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Select from 'react-select'

import { setGetStartedCountry, setGetStartedPurpose } from '../../actions/customer'
import { fetchVisas } from '../../actions/database'

const mapStateToProps = state => ({ 
    countries: state.database.countries.countries,
    getStarted: state.customer.getStarted
})

const mapDispatchToProps = dispatch => ({
    fetchVisas: params => dispatch(fetchVisas(params)),
    setGetStartedCountry: country => dispatch(setGetStartedCountry(country)),
    setGetStartedPurpose: purpose => dispatch(setGetStartedPurpose(purpose))
})


let CountryRevise = ({countries, getStarted, setGetStartedCountry, setGetStartedPurpose, fetchVisas}) => {
    return (
        <div>
            <div style={{padding : "8px"}} class="row">
                <div style={{paddingLeft: "8px"}} class="col-sm-offset-3 col-sm-9">
                <form method="POST" id="get_visa_form" action="/" class="revise-country">
                    <span>I am travelling to &nbsp;</span>
                    <Select
                        name="country"
                        value={getStarted.country}
                        onChange={ country => setGetStartedCountry(country.value) }
                        options={ countries ? countries.map(country => ({value: country.name, label: country.name})) : []}
                    />
                    <span>&nbsp;for&nbsp;</span>
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
                    <button id="show_requirements" disabled = { getStarted.purpose ? false : true } class="btn btn-primary show-requirements-button" onClick={e => e.preventDefault()}>
                        <Link onClick={() => fetchVisas(getStarted)} to={'/requirements/'+getStarted.country+'/'+getStarted.purpose}>FLY</Link>
                    </button>
                </form>
                </div>
            </div>
        </div>
    );
};

CountryRevise = connect(mapStateToProps, mapDispatchToProps)(CountryRevise);
export default CountryRevise;