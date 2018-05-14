import React from 'react';
import { connect } from 'react-redux';

import Footer from './partials/Footer';

import { fetchUser } from '../actions/user';
import { fetchLocation } from '../actions/location';

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: () => dispatch(fetchUser()),
        fetchLocation: () => dispatch(fetchLocation())
    }
}

class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchUser();
        this.props.fetchLocation();
    }

    render() {
        return (
            <div>
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(Layout);