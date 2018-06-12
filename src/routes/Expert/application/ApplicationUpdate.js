import React from 'react';
import { connect } from 'react-redux';
import { updateApplication, deleteApplication } from '../../../actions/expert';
import {Link} from 'react-router-dom';
import './Application.scss';

function prettyDate(date){
    return date.substring(0,10);
}

function borderColor(status){
    switch(status){
        case "Submitted": return "#2196f3";
        case "Pickup Scheduled": return "#ffc107";
        case "Ready to Submit": return "#00bcd4";
        case "Reviewed: NOT OKAY": return"#f44336";
        default: return "#ffffff";
    }
}

const mapStateToProps = state => ({database: state.database})

const mapDispatchToProps = dispatch => ({
    updateApplication: application => dispatch(updateApplication(application)),
    deleteApplication: id => dispatch(deleteApplication(id))
})

let ApplicationUpdate = ({idCustomer, updateApplication, deleteApplication, application, database }) => {
  let name, country, visaType, travelDate, employmentStatus, submissionDate, status, updateForm
  let { countries, purposes } = database
  return (
    <div class='application-update-form'>
        <div>
            {console.log('----------this is the application object---------',application)}
            <div>
            <div class='mask row' style={{borderRight:`solid 8px ${borderColor(application.status)}`}}>
                    <span class='col-lg-2'>
                        <span>
                            {application.name}
                        </span>
                        <br/>
                        <span>
                            {`${application.country} - ${application.visaType}`}
                        </span>
                    </span>
                    <span class='col-lg-2'>
                        <span>
                            Travel Date:
                        </span>
                        <br/>
                        <span>
                            {prettyDate(application.travelDate)}
                        </span>
                    </span>
                    <span class='col-lg-2'>
                        <span>
                            Profession:
                        </span>
                        <br/>
                        <span>
                        {application.employmentStatus} 
                        </span>
                    </span>
                    <span class='col-lg-3' style={{borderRight:'solid 1px #e3e4e6'}}>
                        <span>
                            Submission/Interview Date:
                        </span>
                        <br/>
                        <span>
                            {application.submissionDate ? prettyDate(application.submissionDate) : 'Not Decided Yet'}
                        </span>
                    </span>
                        <span class='col-lg-2'>
                            Status:<br/>{application.status}            
                        </span>
                        {
                            idCustomer ?
                            null :
                            <span class='col-lg-1' onClick={()=>{updateForm.style.display='block'}}>
                                Edit
                            </span>
                        }
            </div>
        </div>
    </div>
    <div class='update-application mask' ref={node=>{updateForm=node}} style={{display:'none'}}>
            <div class='row'>
                <p class='col-lg-3'> Name : <input type="text" defaultValue={application.name} required="required" ref = {node => { name = node}} /></p>
                <p class='col-lg-3'>Country : <select defaultValue={application.country} ref = {node => { country = node }}>
                    {countries.countries ? countries.countries.map(country => 
                    <option value={country.name} key={country._id}> {country.name} </option> 
                    ) : null}
                    </select></p>
                <p class='col-lg-3'>Visa : <select defaultValue={application.visaType} ref = {node => { visaType = node }}>
                    {purposes.purposes ? purposes.purposes.map(purpose => 
                    <option value={purpose.name} key={purpose._id}> {purpose.name} </option> 
                     ) : null}
                    </select>
                </p>
            </div>
            <br/>
            <div class='row'>
                <p class='col-lg-3'> Travel Date : <input type="date" defaultValue={application.travelDate  ? application.travelDate.substring(0,10) : null } ref = {node => { travelDate = node}} /></p>
                <p class='col-lg-3'> Employment Status : <select defaultValue={application.employmentStatus} ref = {node => { employmentStatus = node }}>
                        <option value='Employed'>Employed</option>
                        <option value='Self-Employed'>Self-Employed</option>
                        <option value='Student'>Student</option>
                        <option value='Unemployed'>Unemployed</option>
                    </select></p>
                <p class='col-lg-4'> Submission Date : <input type="date" defaultValue={application.submissionDate ? application.submissionDate.substring(0,10) : null } ref = {node => { submissionDate = node}} /></p>
           </div>
           <br/>
           <div>
                <p> Status: {
                        application.orderType === 'Pickup Drop' ?
                        <select defaultValue={application.status} ref = {node => { status = node }}>
                            <option value='Pickup Scheduled'>Pickup Scheduled</option>
                            <option value='Under Review'>Under Review</option>
                            <option value='Ready to Submit'>Ready to Submit</option>
                            <option value='Submitted'>Submitted</option>
                            <option value='Collected'>Collected</option>
                            <option value='Delivered'>Delivered</option>
                        </select> : application.orderType === 'eVisa' ?
                        <select defaultValue={application.status} ref = {node => { status = node }}>
                            <option value='Under Review'>Under Review</option>
                            <option value='Ready to Submit'>Ready to Submit</option>
                            <option value='Submitted'>Submitted</option>
                            <option value='Decision Made'>Decision Made</option>
                        </select> : application.orderType === 'Online Consultation' ?
                        <select defaultValue={application.status} ref = {node => { status = node }}>
                            <option value='Under Review'>Under Review</option>
                            <option value='Application Pack Couriered'>Application Pack Couriered</option>
                            <option value='Ready to Submit'>Ready to Submit</option>
                            <option value='Submitted'>Submitted</option>
                            <option value='Decision Made'>Decision Made</option>                
                        </select> : null
                    } </p>
            </div>
            <button  style={{margin:'4px'}} type='button' onClick = {() => { updateApplication({
                idOrder: application.idOrder, id: application._id,
                name: name.value, country: country.value, visaType: visaType.value, travelDate: travelDate.value,
                employmentStatus: employmentStatus.value, submissionDate: submissionDate.value, status: status.value
            }); updateForm.style.display='none'}} id='updateApplication' class="btn btn-primary show-requirements-button">
                Update
            </button>
            <button style={{margin:'4px'}} type='button' onClick = {() => {deleteApplication(application._id); window.location.href = '/expert/orders/'+application.idOrder}} class="btn btn-primary show-requirements-button"> Delete </button>
            <button style={{margin:'4px'}} type='button' onClick={()=>{updateForm.style.display='none'}} class="btn btn-primary show-requirements-button">Cancel</button>
        </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationUpdate)