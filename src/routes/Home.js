import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Banner from './home/Banner';
import FlagScroll from './home/FlagScroll';
import WorkFlowDescription from './home/WorkFlowDescription';
import CustomerReview from './home/CustomerReview';
import JoinNow from './home/JoinNow';

const Home = () => (
    <div>
        <Banner />
        <div class="container">
            <FlagScroll />
            <hr/>
            <WorkFlowDescription />
            <hr/>
            <CustomerReview />
            <hr />
            <JoinNow />
        </div>
    </div>
);

export default Home;