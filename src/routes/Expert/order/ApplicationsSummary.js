import React from 'react';
import { Link } from 'react-router-dom';

const ApplicationsSummary = ({applications}) => (
    <div class="expert-applications row">
        {
            applications ?
            applications.map(application =>
                <Link to={'/expert/applications/'+application._id} key={application._id}>
                    <div class='col-md-6 col-sm-12 col-lg-3'>
                        <p>Name : {application.name}</p>
                        <p>Country : {application.idCountry}</p>
                        <p>Visa : {application.idVisa}</p>
                        <p>Travel Date : {application.travelDate ? application.travelDate.substring(0, 10) : null}</p>
                        <p>Employment Status : {application.employmentStatus}</p>
                        <p>Submission Date : {application.submissionDate ? application.submissionDate.substring(0, 10) : null}</p>
                        <p>Status: {application.status}</p>
                    </div>
                </Link>
            ) :
            <h2>Error connecting to the server</h2>
        }
    </div>
);

export default ApplicationsSummary;