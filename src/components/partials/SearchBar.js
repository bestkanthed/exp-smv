import React from 'react';
import { connect } from 'react-redux'
import { NavLink as Link } from 'react-router-dom';
import './partials.scss';

import { searchCustomer } from '../../actions/expert'

const mapDispatchToProps = dispatch => ({ searchCustomer : query => dispatch(searchCustomer(query)) })

const SearchBar = ({ searchCustomer }) => {
    let query
    return(
        <div class='row'>
            <div class='col-lg-6 search-bar-image'>
            <Link to='/'>
                <img style={{maxWidth:'100%'}} src='../../images/Logos.png'/>
            </Link>
            </div>
            <div class='col-lg-6' style={{backgroundColor:'#fafafa'}}>
                <img src='./../../../images/ic/search/grey600.png'/>
                <input class='search-bar' type='text' placeholder='Search By Name, Email ID, Phone' ref = {node => { query = node }}/>
                <Link to='/expert/orders'>
                    <button class='search-button' onClick={() => searchCustomer(query.value)}>Search</button>
                </Link>
            </div>
        </div>
    );
}

export default connect(null, mapDispatchToProps)(SearchBar)