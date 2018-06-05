import React from 'react';
import { connect } from 'react-redux';

import { loadPopup } from '../../../actions/popup';

const mapStateToProps = state => ({ visas : state.database.visas })

const mapDispatchToProps = dispatch => ({ loadPopup : content => dispatch(loadPopup(content)) })

let VisaRequirement = ({visas, applyForVisa, loadPopup}) => (
    <div class="col-md-9">
        <div class="tab-content">
            {visas.visas ? visas.visas.map((visa, index1) => 
                <div id={"docsreq" + index1} key={index1} class={"tab-pane fade in requirements docsreq" + (index1 === 0 ? ' active': '')}>
                    <h3 class="requirements-heading">Documents Required:</h3>
                    <div class="row">
                        {visa.documents.map((document, index2) =>
                            <div class="col-lg-12" key={index2}>
                                <div class="requirements requirements-content" dangerouslySetInnerHTML={{__html: document.description}}></div>
                            </div>
                        )}
                    </div>
                    <div style={{textAlign: 'center'}} class="requirements">
                        <div class="row">
                            <div class="col-sm-12">
                            <button onClick={() => loadPopup('Signup')} class="button_yellow">Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null }
        </div>
    </div>
);

VisaRequirement = connect(mapStateToProps, mapDispatchToProps)(VisaRequirement);
export default VisaRequirement;