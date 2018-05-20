import React from 'react';
import { Link } from 'react-router-dom';

const ApplicationsSummary = ({applications}) => (
    <div class="expert-applications row">
        {
            applications ?
            applications.map(application =>
                <Link to={'/expert/application/'+application.id} key={application.id}>
                    <div class='col-md-6 col-sm-12 col-lg-3'>
                        <p>{application.name}</p>
                        <p>{application.travelDate}</p>
                        <p>{application.profession}</p>
                        <p>{application.submissionDate}</p>
                        <p>{application.status}</p>
                    </div>
                </Link>
            ) :
            <h2>Error connecting to the server</h2>
        }
    </div>
);

export default ApplicationsSummary;