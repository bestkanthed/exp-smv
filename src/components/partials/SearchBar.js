import React from 'react';
import { connect } from 'react-redux'
import { NavLink as Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import './partials.scss';

import OrderSummary from './OrderSummary'

import { searchCustomer } from '../../actions/expert'
import { searchResults } from '../../actions/search'

const mapDispatchToProps = dispatch => ({ 
    searchCustomer : query => dispatch(searchCustomer(query)), 
    searchResults : results => dispatch(searchResults(results))
})

function mapStateToProps(state) {
    return {
        user : state.user.user, 
        orders : state.expert.orders, 
        search : state.search
    }
}

class SearchBar extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            isOpen : false, 
        }
        this.search = this.search.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({...this.state, isOpen : !this.state.isOpen})
    }

    search(input) {
        if (this.props.orders.fetching) {
            console.log('loading...')
        } else if (this.props.orders.fetched) {
            console.log('im hereee')
            var results = this.props.orders.orders.filter(order => {
                return order.customer[0].name.startsWith(input) || order.customer[0].email.startsWith(input) || order.customer[0].phone.startsWith(input)
            })
            this.props.searchResults(results)
            console.log(results, 'these are the search results')
        } else {
            console.log('go to expert page first')
        }
    }

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
                       <input onChange={(event) => {event.target.value===''? console.log('solved i guess') : this.search(event.target.value); this.setState({...this.state, isOpen : true})}} class='search-bar' type='text' placeholder='Search By Name, Email ID, Phone'
                       ref = {node => { query = node }}
                       onKeyPress={e => {if (e.key === 'Enter') searchButton.click()} }/>
                       <button class='search-button' onClick={this.toggle} ref={(node)=>{searchButton=node}}>Search</button>
                       {/* <Link to='/expert/orders'>
                           <button class='search-button' ref = {node => { searchButton = node }} onClick={() => console.log(this.props)}>Search</button>
                       </Link> */}
                       <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                           <DropdownToggle style={{backgroundColor : '#fafafa', boxShadow :'none'}}>
                           </DropdownToggle>
                           <DropdownMenu>
                               {
                                   this.props.search.finding ? 
                                        <div>No results yet</div> : this.props.search.length===0? <div>No result yet</div> :
                                        <div style={{padding : '3%'}} onClick={this.toggle}>
                                        <OrderSummary orders={this.props.search} />
                                        </div>
                               }
                           </DropdownMenu>
                       </Dropdown>
                   </div> 
                     : ''
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)