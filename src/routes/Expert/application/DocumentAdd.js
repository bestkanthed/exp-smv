import React from 'react';
import { connect } from 'react-redux';
import { postDocument } from '../../../actions/expert';

const mapDispatchToProps = dispatch => {
  return {
    postDocument: document => dispatch(postDocument(document))
  }
}

let DocumentAdd = ({postDocument, idApplication}) => {
  let name, category;
  return (
    <div class="row add-document">
      <div class="col-lg-12">
        <form id="add-document-form" >
          <h1>Add Document</h1>
          <div class="row document-form">
          <div class="col-sm-12">
              <input type="name" name="name" id="name" placeholder="Name" required="required" class="form-control"
                ref = {node => {
                  name = node;
                }}
              />
            </div>
            <div class="col-sm-12">
              <select name="category" id="category" required="required" class="form-control"
                ref = {node => {
                  category = node;
                }}
              >
                <option value='Passport'>Passport</option>
                <option value='Photograph'>Photograph</option>
                <option value='Forms & Letters'>Forms & Letters</option>
                <option value='Financials'>Financials</option>
                <option value='Employment Proofs'>Employment Proofs</option>
                <option value='Booking'>Booking</option>
                <option value='Insurance'>Insurance</option>
                <option value='Additional'>Additional</option>
              </select>
            </div>
            <div class="col-sm-6">
                <button type='button' onClick = {() => postDocument({
                    idApplication: idApplication, name: name.value, category: category.value, uploaded: false, status: null
                })} id='submitDocument' class="btn btn-primary show-requirements-button">
                    Add Document
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(DocumentAdd);