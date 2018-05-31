import React from 'react';
import { connect } from 'react-redux';
import { postApplication } from '../../../actions/expert';

const mapDispatchToProps = dispatch => {
  return {
    postApplication: application => dispatch(postApplication(application))
  }
}

let ApplicationAdd = ({postApplication, idOrder}) => {
  let name, country, visa, travelDate, employmentStatus, submissionDate, status;
  return (
    <div class="row add-application">
      <div class="col-lg-12">
        <form id="add-application-form" >
          <h3>Add Application</h3>
          <div class="row application-form">
          <div class="col-sm-12">
              <input type="name" name="name" id="name" placeholder="Name" required="required" class="form-control"
                ref = {node => {
                  name = node;
                }}
              />
            </div>
            <div class="col-sm-12">
              <select name="country" id="country" required="required" class="form-control"
                ref = {node => {
                  country = node;
                }}
              >
                <option value='Singapore'>Singapore</option>
              </select>
            </div>
            <div class="col-sm-12">
              <select name="visa" id="visa" required="required" class="form-control"
                ref = {node => {
                  visa = node;
                }}
              >
                <option value='Tourist'>Tourist</option>
                <option value='Business'>Business</option>
              </select>
            </div>
            <div class="col-sm-12">
              <input type="date" name="travelDate" id="travelDate" required="required" class="form-control"
                ref = {node => {
                  travelDate = node;
                }}
              />
            </div>
            <div class="col-sm-12">
              <select name="employmentStatus" id="employmentStatus" required="required" class="form-control"
                ref = {node => {
                    employmentStatus = node;
                }}
              >
                <option value='Employed'>Employed</option>
                <option value='Self-Employed'>Self-Employed</option>
                <option value='Student'>Student</option>
                <option value='Unemployed'>Unemployed</option>
              </select>
            </div>
            <div class="col-sm-12">
              <input type="date" name="submissionDate" id="submissionDate" required="required" class="form-control"
                ref = {node => {
                    submissionDate = node;
                }}
              />
            </div>
            <div class="col-sm-12">
              <select name="status" id="status" required="required" class="form-control"
                ref = {node => {
                    status = node;
                }}
              >
                <option value='Pickup Scheduled'>Pickup Scheduled</option>
                <option value='Ready to Submit'>Ready to Submit</option>
                <option value='Reviewed: NOT OKAY'>Reviewed: NOT OKAY</option>
                <option value='Submitted'>Submitted</option>
              </select>
            </div>
            <div class="col-sm-6">
                <button type='button' onClick = {() => postApplication({
                    idOrder: idOrder,
                    name: name.value, idCountry: country.value, idVisa: visa.value, travelDate: travelDate.value,
                    employmentStatus: employmentStatus.value, submissionDate: submissionDate.value, status: 'New Application'
                })} id='submitApplication' class="btn btn-primary show-requirements-button">
                    Add Application
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(ApplicationAdd);