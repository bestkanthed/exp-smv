import React from 'react';
import { connect } from 'react-redux'
import { NavLink as Link } from 'react-router-dom';
import './partials.scss';

import { searchCustomer } from '../../actions/expert'
import { PassThrough } from 'stream';

const mapDispatchToProps = dispatch => ({ searchCustomer : query => dispatch(searchCustomer(query))})

function mapStateToProps(state) {
    return {
        user : state.user.user
    }
}

class SearchBar extends React.Component {
    
    render () {
        let query, searchButton
        return(
            <div class='row'>
                <div class={`${
                     this.props.user?
                        this.props.user.teams.find((elem) => {
                            return elem === 'customer'
                        })? 'col-lg-8':'col-lg-6'
                        : null
                 
                } search-bar-image`}>
                <Link to='/login'>
                    <img style={{maxWidth:'50%', marginRight:'3%'}} src='../../ops-app/images/Logos.png'/>
                </Link>
                {
                     this.props.user?
                        this.props.user.teams.find((elem) => {
                            return elem === 'customer'
                        })? '':'Visa Expert Dasboard'
                        : null
                 
                } 
                </div> 
                {
                     this.props.user?
                        this.props.user.teams.find((elem) => {
                            return elem === 'customer'
                        })? <div class='col-lg-4'style={{marginTop: '4%'}}>For any escalations call +91 8291999116</div>:null
                        : null
                 
                }
                {
                    this.props.user? 
                       this.props.user.teams.find((element) => {
                           return element === 'customer'
                       }) ? null :<div class='col-lg-6' style={{backgroundColor:'#fafafa'}}>
                       <img src='./../../../ops-app/images/ic/search/grey600.png'/>
                       <input class='search-bar' type='text' placeholder='Search By Name, Email ID, Phone'
                       ref = {node => { query = node }}
                       onKeyPress={e => {if (e.key === 'Enter') searchButton.click()} }/>
                       <Link to='/expert/orders'>
                           <button class='search-button' ref = {node => { searchButton = node }} onClick={() => this.props.searchCustomer(query.value)}>Search</button>
                       </Link>
                   </div> 
                     : ''
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)