import React from 'react'
import { connect } from 'react-redux'

import { loadPopup } from '../../actions/popup'
import { fetchExperts } from '../../actions/support'

import Experts from './generate/Experts'

const mapDispatchToProps = dispatch => {
    return {
        showCreateCustomerCumOrderPopup: () => dispatch(loadPopup('CreateCustomerCumOrder')),
        fetchExperts: () => dispatch(fetchExperts())
    }
}

class Generate extends React.Component {
    
    componentWillMount() {
        this.props.fetchExperts()
    }

    render() {
        return (
            <div class="container support">
                <button onClick={this.props.showCreateCustomerCumOrderPopup}>
                    CreateCustomerCumOrder
                </button>
                <Experts />
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(Generate);