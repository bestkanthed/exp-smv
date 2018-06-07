import React from 'react';
import {NavLink as Link} from 'react-router-dom';
import './partials.scss';

function setPathName(path){
    const orderIdRegex= new RegExp(/(\/expert\/orders\/\S+)/);
    const expertRegex = new RegExp(/(\/expert\/orders)/);
    const applicationRegex = new RegExp(/(\/expert\/applications\/\S+)/);
    const documentsRegex = new RegExp(/(\/expert\/documents\/\S+)/);
    if(path.match(expertRegex)) {
        if(path.match(orderIdRegex)) {

            return <div>
                <Link exact={true} activeStyle={{color:'red'}} to='/expert/orders'>Dashboard</Link>>>>>>>
                <Link exact={true} activeStyle={{color:'red'}} to={path}>Order</Link>
            </div>
            ;
        } else {
            return <div>
                <Link to={path} exact={true} activeStyle={{color:'red'}}>
                Dashboard</Link>
            </div>
        }
    } else if (path.match(applicationRegex)) {
        return 'Order for this customer';
    } else if (path.match(documentsRegex)) {
        return 'Documents for this guy';
    }
}

const SearchBar= () => {
    return (
        <div>
            <div class='search-bar-image'>
            </div>
            <div>
                {
                    setPathName(window.location.pathname)
                }
            </div>
        </div>
    );
}

export default SearchBar;