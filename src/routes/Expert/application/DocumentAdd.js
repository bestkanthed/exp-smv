import React from 'react';
import { connect } from 'react-redux';
import { postDocument } from '../../../actions/expert';

const mapDispatchToProps = dispatch => {
  return {
    postDocument: document => dispatch(postDocument(document))
  }
}


let DocumentAdd = ({postDocument, idApplication}) => {
  let name, category,addDocument;
  return (
    <div>
    <div class='button-mask' onClick={()=>{addDocument.style.display='block'}}>
      Add New Document
      </div>
      
    <div class="row add-document" style={{display:'none'}} ref={node=>{addDocument=node}}>
      <div class="col-lg-12">
        <form id="add-document-form" >
          <h1>Add Document</h1>
          <div class="row document-form">
          <div class="col-sm-12">
              <input type="name" name="name" id="name" placeholder="Document Name" defaultValue='Document Name' required="required" class="form-control"
                ref = {node => {
                  name = node;
                }}
              />
            </div>
            <div class="col-sm-12">
              <select name="category" id="category" defaultValue='Passport' required="required" class="form-control"
                ref = {node => {
                  category = node;
                }}
              >
                <option value='Mandatory Documents'>Mandatory Documents</option>
                <option value='Forms & Letters'>Forms & Letters</option>
                <option value='Travel Proofs'>Travel Proofs</option>
                <option value='Financial Documents'>Financial Documents</option>
                <option value='Occupation Proofs'>Occupation Proofs</option>
                <option value='Others'>Others</option>
              </select>
            </div>
            <div class="col-sm-6">
                <button type='button' onClick = {() => {
                  if(!name.value) return alert('Document name not entered')
                  postDocument({
                    idApplication: idApplication, name: name.value, category: category.value, status: 'Pending'
                });addDocument.style.display='none'}} id='submitDocument' class="btn btn-primary show-requirements-button">
                    Add Document
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(DocumentAdd);