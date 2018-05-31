import React from 'react';
import { connect } from 'react-redux';
import { updateApplication, deleteApplication } from '../../../actions/expert';

const mapDispatchToProps = dispatch => ({
    updateApplication: application => dispatch(updateApplication(application)),
    deleteApplication: id => dispatch(deleteApplication(id))
})

let ApplicationUpdate = ({ updateApplication, deleteApplication, application }) => {
  let name, idCountry, idVisa, travelDate, employmentStatus, submissionDate, status
  return (
    <div class='update-application'>
        Name : <input type="text" defaultValue={application.name} required="required" ref = {node => { name = node}} />
        Country : <select defaultValue={application.idCountry} ref = {node => { idCountry = node }}>
            <option value='Singapore'>Singapore</option>
            <option value='Malaysia'>Malaysia</option>
        </select>
        Visa : <select defaultValue={application.idVisa} ref = {node => { idVisa = node }}>
            <option value='Tourist'>Tourist</option>
            <option value='Business'>Business</option>
        </select>
        Travel Date : <input type="date" defaultValue={application.travelDate  ? application.travelDate.substring(0,10) : null } ref = {node => { travelDate = node}} />
        Employment Status : <select defaultValue={application.employmentStatus} ref = {node => { employmentStatus = node }}>
            <option value='Employed'>Employed</option>
            <option value='Self-Employed'>Self-Employed</option>
            <option value='Student'>Student</option>
            <option value='Unemployed'>Unemployed</option>
        </select>
        Submission Date : <input type="date" defaultValue={application.submissionDate ? application.submissionDate.substring(0,10) : null } ref = {node => { submissionDate = node}} />
        Status: {
            application.orderType === 'Pickup Drop' ?
            <select defaultValue={application.status} ref = {node => { status = node }}>
                <option value='Pickup Scheduled'>Pickup Scheduled</option>
                <option value='Under Review'>Under Review</option>
                <option value='Ready to Submit'>Ready to Submit</option>
                <option value='Submitted'>Submitted</option>
                <option value='Collected'>Collected</option>
                <option value='Delivered'>Delivered</option>
            </select> : null
        }
        {
            application.orderType === 'eVisa' ?
            <select defaultValue={application.status} ref = {node => { status = node }}>
                <option value='Under Review'>Under Review</option>
                <option value='Ready to Submit'>Ready to Submit</option>
                <option value='Submitted'>Submitted</option>
                <option value='Decision Made'>Decision Made</option>
            </select> : null
        }
        {
            application.orderType === 'Online Consultation' ?
            <select defaultValue={application.status} ref = {node => { status = node }}>
                <option value='Under Review'>Under Review</option>
                <option value='Application Pack Couriered'>Application Pack Couriered</option>
                <option value='Ready to Submit'>Ready to Submit</option>
                <option value='Submitted'>Submitted</option>
                <option value='Decision Made'>Decision Made</option>                
            </select> : null
        }
        <button type='button' onClick = {() => updateApplication({
            idOrder: application.idOrder, id: application._id,
            name: name.value, idCountry: idCountry.value, idVisa: idVisa.value, travelDate: travelDate.value,
            employmentStatus: employmentStatus.value, submissionDate: submissionDate.value, status: status.value
        })} id='updateApplication' class="btn btn-primary show-requirements-button">
            Update
        </button>
        <button type='button' onClick = {() => {deleteApplication(application._id); window.location.href = '/expert/orders/'+application.idOrder}} class="btn btn-primary show-requirements-button"> Delete </button>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(ApplicationUpdate);