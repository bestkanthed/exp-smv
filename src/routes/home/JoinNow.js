import React from 'react';
import { connect } from 'react-redux';

import { showGetStartedPopup } from '../../actions/customer';

const mapDispatchToProps = dispatch => {
  return {
    showPopup : (index) => {
        showGetStartedPopup(dispatch, index);        
    }
  }
};

let JoinNow = ({showPopup}) => (
    <div class="row join-now">
        <div class="col-md-12 forget-worrying">
            <h3>GET STARTED & FORGET WORRYING ABOUT YOUR VISA</h3>
        </div>
        <div class="col-md-12 tagline">
            <h3>Get your Visa stamped hasslefree</h3>
        </div>
        <div class="col-md-12 get_started">
            <div onClick={() => showPopup(null)} class="button_yellow">GET STARTED</div>
        </div>
    </div>
);

JoinNow = connect(null, mapDispatchToProps)(JoinNow);
export default JoinNow;