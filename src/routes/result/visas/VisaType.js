import React from 'react';
import { connect } from 'react-redux';

import { fetchVisas } from '../../../actions/database'

const mapStateToProps = state => ({
    getStarted : state.customer.getStarted,
    visas : state.database.visas
})

const mapDispatchToProps = dispatch => ({ fetchVisas: params => dispatch(fetchVisas(params))})

class VisaType extends React.Component {
    
    
    componentDidMount () {
        let { getStarted, fetchVisas } = this.props
        fetchVisas(getStarted)
    }
    
    render () {
        
        let { visas } = this.props.visas

        return (
            <div class="col-md-3">
                <p class="choose">Choose Visa Type :</p>
                <ul class="nav nav-pills nav-stacked">
                    {
                        visas ?
                        visas.map((visa, index) =>
                            <li key={visa._id} class = {"visa-type" + (index === 0 ? ' active': '')}>
                                <a data-toggle="pill" href={"#docsreq" + index}>
                                    <div class="row">
                                    <div class="col-lg-10">
                                        <div class="row">
                                        <div class="col-lg-12 tag-visa-type">Visa Type</div>
                                        <div class="col-lg-12 tag-visa-value">{visa.name}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2"><img src="/images/arrow_right.svg" style={{float:'right'}}/></div>
                                    </div>
                                </a>
                            </li>
                        ) :
                        null
                    }
                </ul>
            </div>
        );
    }
}

VisaType = connect(mapStateToProps, mapDispatchToProps)(VisaType);
export default VisaType;