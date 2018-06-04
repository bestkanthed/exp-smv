import React from 'react';
import { connect } from 'react-redux';

import VisaType from './visas/VisaType';
import VisaRequirement from './visas/VisaRequirement';


let Visas = () => (
    <div class="container visa-requirements">
        <div class="row">
            <VisaType />
            <VisaRequirement />
        </div>
    </div>
);

export default Visas;