import React from 'react';
import { connect } from 'react-redux'
import { NavLink as Link } from 'react-router-dom';
import './partials.scss';

import { searchCustomer } from '../../actions/expert'
import { PassThrough } from 'stream';

const mapDispatchToProps = dispatch => ({ searchCustomer : query => dispatch(searchCustomer(query)) })

function location(path=''){
    switch(path) {
        case '/expert/orders' : return 'Visa Expert Dashboard';
        case '/expert/notifications' : return 'Notifications';
        case '/expert/applications' : return 'Application';        
    }
}

const SearchBar = ({ searchCustomer }) => {
    let query, searchButton
    return(
        <div class='row'>
            <div class='col-lg-6 search-bar-image'>
            <Link to='/'>
                <img style={{maxWidth:'50%', marginRight:'3%'}} src='../../images/Logos.png'/>
            </Link> 
            Visa Expert Dashboard
            </div>
            <div class='col-lg-6' style={{backgroundColor:'#fafafa'}}>
                <img src='./../../../images/ic/search/grey600.png'/>
                <input class='search-bar' type='text' placeholder='Search By Name, Email ID, Phone'
                ref = {node => { query = node }}
                onKeyPress={e => {if (e.key === 'Enter') searchButton.click()} }/>
                <Link to='/expert/orders'>
                    <button class='search-button' ref = {node => { searchButton = node }} onClick={() => searchCustomer(query.value)}>Search</button>
                </Link>
            </div>
        </div>
    );
}

export default connect(null, mapDispatchToProps)(SearchBar)