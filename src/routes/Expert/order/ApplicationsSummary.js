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
    <div class="expert-applications row">
        {
            applications ?
            applications.map(application =>
                <Link  style={{color:'black'}} to={(idCustomer ? '/customer' : '/expert') + '/applications/'+application._id} key={application._id}>
                    <div class='col-md-6 col-sm-12 col-lg-8'>
                        <div class= "mask row" style={{borderRight:`solid 6px ${BorderColor(application.status)}`, padding:'2%'}}>
                            <div>
                                <div class='col-lg-2 col-md-2'>
                                    <p>{application.name}</p>
                                    <p>{application.country} - {application.visaType}</p>
                                </div>
                                <div class='col-lg-2 col-md-3'>
                                <p>Travel Date :</p><p>{application.travelDate ? application.travelDate.substring(0, 10) : null}</p>
                                </div>
                                <div class='col-lg-3 col-md-3'>
                                <p>Employment Status :</p><p> {application.employmentStatus}</p>
                                </div>
                                <div class='col-lg-2 col-md-3'>
                                <p>Submission Date :</p><p>{application.submissionDate ? application.submissionDate.substring(0, 10) : null}</p>
                                </div>
                                <div class='col-lg-3 col-md-3'>
                                <p>Status: </p><p>{application.status}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ) :
            <h2>Error connecting to the server</h2>
        }
    </div>
);

export default ApplicationsSummary;
