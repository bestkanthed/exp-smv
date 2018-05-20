import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        flash: state.flash
    }
};

let Flash = ({flash}) => (
  <div class="row login-form">
    <div class="col-lg-12">
      <div class='flash-message'>{flash.message}</div>
    </div>
  </div>
);

export default connect(mapStateToProps)(Flash);