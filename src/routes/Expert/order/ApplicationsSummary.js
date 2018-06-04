import React from 'react';
import { Link } from 'react-router-dom';
import './ApplicationSummary.scss';


function BorderColor(status){
    switch(status){
        case "Submitted": return "#2196f3";
        case "Pickup Scheduled": return "#ffc107";
        case "Ready to Submit": return "#00bcd4";
        case "Reviewed: NOT OKAY": return"#f44336";
        default: return "#ffffff";
    }
}

const ApplicationsSummary = ({applications, idCustomer}, name="Shahaji") => (
    <div class="expert-applications row">
        {
            applications ?
            applications.map(application =>
                <Link to={(idCustomer ? '/customer' : '/expert') + '/applications/'+application._id} key={application._id}>
                    <div class='col-md-6 col-sm-12 col-lg-8'>
                        <div class= "mask row" style={{borderRight:`solid 6px ${BorderColor(application.status)}`}}>
                            <div>
                                <div class='col-lg-2 col-md-2'>
                                    <p>{application.name}</p>
                                    <p>{application.country} - {application.visaType}</p>
                                </div>
                                <div class='col-lg-2 col-md-3'>
                                <p>Travel Date : <br/>{application.travelDate ? application.travelDate.substring(0, 10) : null}</p>
                                </div>
                                <div class='col-lg-2 col-md-3'>
                                <p>Employment Status : {application.employmentStatus}</p>
                                </div>
                                <div class='col-lg-2 col-md-3'>
                                <p>Submission Date : {application.submissionDate ? application.submissionDate.substring(0, 10) : null}</p>
                                </div>
                                <div class='col-lg-4 col-md-3'>
                                <p>Status: {application.status}</p>
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
