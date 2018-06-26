import React from 'react';
import { connect } from 'react-redux';
import { updateApplication, deleteApplication } from '../../../actions/expert';
import './Application.scss';


function prettyDate(date){
    return date ? date.substring(0,10) : undefined
}

function borderColor(status){
    switch(status){
        case "Complete": return "#1ddaae";
        case "Submitted": return "#1ddaae";
        case "In Process": return "#ffc107";
        case "New Application": return"#f44336";
        case 'Pickup Scheduled': return '#ffc107';
        case 'Under Review': return '#ffc107';
        case 'Ready To Submit': return '#ffc107';
        case 'Application Pack Couriered': return '#ffc107';
        case 'Collected': return '#1ddaae';
        case 'Delivered': return '#1ddaae';
        case 'Decision Made': return '#1ddaae';
        default: return "#ffffff";
    }
}

const mapStateToProps = state => ({database: state.database})

const mapDispatchToProps = dispatch => ({
    updateApplication: application => dispatch(updateApplication(application)),
    deleteApplication: id => dispatch(deleteApplication(id))
})

let ApplicationUpdate = ({idCustomer, updateApplication, deleteApplication, application, database, order }) => {
  let name, visaType, travelDate, employmentStatus, submissionDate, status, updateForm
  let { countries } = database
  return (
    application ?
    <div class='application-update-form'>
        <div>
            <div>
                <div class='mask row' style={{borderRight:`solid 8px ${borderColor(application.status)}`}}>
                    <span class='col-lg-2' style={{whiteSpace:'normal'}}>
                        <span>
                            {application.name}
                        </span>
                        <br/>
                        <span>
                            {`${application.country} - ${application.visaType}`}
                        </span>
                    </span>
                    <span class='col-lg-1'>
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
                    {
                        order ? [
                            <span key='orderId' class='col-lg-1'>
                                Order Id:<br/>{order.orderCode}            
                            </span>,
                            <span key='invoiceNo' class='col-lg-1'>
                                Invoice No:<br/>{order.invoiceNo}            
                            </span>
                        ] : null
                    }
                    <span class='col-lg-1'>
                        Status:<br/>{application.status}            
                    </span>
                    {
                        idCustomer ?
                        null :
                        application.status === 'Past' ?
                        null :
                        <span class='col-lg-1' onClick={()=>{updateForm.style.display='block'}}>
                               &nbps; <img src='../../../images/ic/ic/ic_edit_24px.png' /> Edit
                        </span>
                    }
            </div>
        </div>
    </div>
        <div class='update-application mask' ref={node=>{updateForm=node}} style={{display:'none'}}>
            <div class='row'>
                <p class='col-lg-3'>Name : <input type="text" key={application.name} defaultValue={application.name} ref = {node => { name = node}} /></p>
                <p class='col-lg-3'>Country : {application.country} </p>
                <p class='col-lg-3'>Visa : <select key={application.visaType} defaultValue={application.visaType} ref = {node => { visaType = node }}>
                    {
                        countries.countries ? (countries.countries.find(c => c.name === application.country)).visas.map(visa =>
                            <option value={visa.name} key={visa._id}> {visa.name} </option> 
                        ) : null
                    }
                    </select>
                </p>
            </div>
            <br/>
            <div class='row'>
                <p class='col-lg-3'> Travel Date : <input type="date" key={application.travelDate} defaultValue={application.travelDate  ? application.travelDate.substring(0,10) : null } ref = {node => { travelDate = node}} /></p>
                <p class='col-lg-3'> Employment Status : <select key={application.employmentStatus} defaultValue={application.employmentStatus} ref = {node => { employmentStatus = node }}>
                        <option value=''></option>
                        <option value='Employed'>Employed</option>
                        <option value='Self-Employed'>Self-Employed</option>
                        <option value='Student'>Student</option>
                        <option value='Unemployed'>Unemployed</option>
                    </select></p>
                <p class='col-lg-4'> Submission Date : <input type="date" key={application.submissionDate} defaultValue={application.submissionDate ? application.submissionDate.substring(0,10) : null } ref = {node => { submissionDate = node}} /></p>
           </div>
           <br/>
           <div>
                <p> Status: {
                        application.orderType === 'Pickup Drop' ?
                        <select defaultValue={application.status} key={application.status} ref = {node => { status = node }}>
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
                name: name.value, visaType: visaType.value, travelDate: travelDate.value,
                employmentStatus: employmentStatus.value, submissionDate: submissionDate.value, status: status.value
            }); updateForm.style.display='none'}} id='updateApplication' class="btn btn-primary show-requirements-button">
                Update
            </button>
            <button style={{margin:'4px'}} type='button' onClick = {() => { if(confirm("Are you sure you want to delete")) { deleteApplication(application._id); window.location.href = '/expert/orders/'+application.idOrder}} } class="btn btn-primary show-requirements-button"> Delete </button>
            <button style={{margin:'4px'}} type='button' onClick={() => {updateForm.style.display='none'}} class="btn btn-primary show-requirements-button">Cancel</button>
        </div>
    </div> : null
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationUpdate)