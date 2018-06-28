import React from 'react';
import { Link } from 'react-router-dom';
import './ApplicationSummary.scss';

function BorderColor(status){
    switch(status){
        case "Complete": return "#1ddaae";
        case "Submitted": return "#2196f3";
        case "In Process": return "#ffc107";
        case "New Application": return"#f44336";
        case 'Pickup Scheduled': return '#ffc107';
        case 'Under Review': return '#ffc107';
        case 'Ready To Submit': return '#ffc107';
        case 'Application Pack Couriered': return '#ffc107';
        case 'Collected': return '#2196f3';
        case 'Delivered': return '#2196f3';
        case 'Decision Made': return '#2196f3';
        default: return "#ffffff";
    }
}

const ApplicationsSummary = ({applications, idCustomer}) => (
    <div class="expert-applications">
    {
    applications.map(application =>
        <Link style={{color:'black', textDecoration:'none'}} to={(idCustomer ? '/customer' : '/expert') + '/applications/'+application._id} key={application._id}>
            <div class="mask row" style={{borderRight:`solid 6px ${BorderColor(application.status)}`, paddingTop: '10px'}}>
                <div class='col-lg-1'>
                </div>
                <div class='col-lg-3'>
                    <p>{application.name}</p>
                    <p>{application.country} - {application.visaType}</p>
                </div>
                <div class='col-lg-2'>
                    <p>Travel Date :</p><p>{application.travelDate ? application.travelDate.substring(0, 10) : null}</p>
                </div>
                <div class='col-lg-2'>
                    <p>Employment Status :</p><p> {application.employmentStatus}</p>
                </div>
                <div class='col-lg-2'>
                    <p>Submission Date :</p><p>{application.submissionDate ? application.submissionDate.substring(0, 10) : null}</p>
                </div>
                <div class='col-lg-2'>
                    <p>Status: </p><p>{application.status}</p>
                </div>
            </div>
        </Link>
    )
    }
    </div>
);

export default ApplicationsSummary;
