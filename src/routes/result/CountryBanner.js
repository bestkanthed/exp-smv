import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    country : state.customer.getStarted.country,
    countries: state.database.countries.countries
})

let CountryBanner = ({ countries, country }) => {
    
    let activeCountry = countries ? countries.find(cntry => cntry.name === country) : null
    
    return (
        <div style={{backgroundImage : activeCountry ? "url('/images/covers/"+activeCountry.countryId+".png')" : null}} class="row country-cover-row">
            <div class="col-lg-12 banner">
                <h1 class="country_banner_label">{country}</h1>
            </div>
        </div>
    );
}

CountryBanner = connect(mapStateToProps, null)(CountryBanner);
export default CountryBanner;