import React from 'react';

const TeamMember = ({teamMember}) => (
    <div class="col-md-6 col-lg-3 col-sm-12">
        <img src='/ops-app/images/internal/team/photos/default.png' style={{width: 200}}/>
        <p>{teamMember.name}</p>
        <p>{teamMember.phone}</p>
    </div>
);

export default TeamMember;