import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { showGetStartedPopup } from '../../actions/customer';

const mapStateToProps = state => {
    return {
        flagScrollCountries: state.database.flagScrollCountries
    }
};

const mapDispatchToProps = dispatch => {
    dispatch({
        type: "FETCH_FLAG_SCROLL_COUNTRIES",
        payload: axios.get('/api/flag-scroll-countries')
    });
    return {
        showPopup : (index) => {
            showGetStartedPopup(dispatch, index);
        }
    }
};

let FlagScroll = ({flagScrollCountries, showPopup}) => (
    <div class="row">
        <div class="col-lg-12">
            <ul class="flag-scroll">
            {flagScrollCountries ? flagScrollCountries.map(country =>
                <li class="flag-item" key = {country.code}>
                    <a onClick = {() => showPopup(country.name)} class="flag-link">
                        <img src = {"/ops-app/images/flags/"+country.code+".png"} class="flag-image"/>
                        <br/>
                        <span class="flag-item-text">{country.name}</span>
                    </a>
                </li>
            ): null}
            </ul>
        </div>
    </div>
);

FlagScroll = connect(mapStateToProps, mapDispatchToProps)(FlagScroll);

export default FlagScroll;