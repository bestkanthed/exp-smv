import React from 'react';
import { connect } from 'react-redux';

import { loadPopup } from '../../actions/popup';

const mapDispatchToProps = dispatch => ({ loadPopup : content => dispatch(loadPopup(content)) })

let Banner = ({loadPopup}) => (
    <div class="row landing-row">
        <div class="col-lg-12 banner">
            <h1 class="banner_label">EASY.&nbsp;&nbsp;FAST.&nbsp;&nbsp;RELIABLE.</h1>
        </div>
        <div class="col-lg-12 banner">
            <h3 class="banner_tagline">Get your visa stamped hasslefree.</h3>
        </div>
        <div class="col-lg-12 get_started">
            <button onClick={() => loadPopup('GetStarted')} class="button_yellow">GET STARTED</button>
        </div>
    </div>
)

Banner = connect(null, mapDispatchToProps)(Banner);
export default Banner;