import React from 'react';
import {NavLink as Link} from 'react-router-dom';
import './partials.scss';

export default function SearchBar(props) {
    return(
        <div class='row'>
            <div class='col-lg-6 search-bar-image'>
            <Link to='/'>
                <img  style={{width:'60%'}} src='../../images/logos.png'/>
            </Link>
            </div>
            <div class='col-lg-6' style={{backgroundColor:'#fafafa'}}>
                <img src='../../../images/ic/search/grey600.png'/>
                <input class='search-bar' type='text' placeholder='Search By Name, Email ID, Phone' name='searchBox'/>
                <button class='search-button'>Search</button>
            </div>
        </div>
    );
}