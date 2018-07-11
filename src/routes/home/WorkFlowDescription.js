import React from 'react';

const WorkFlowDescription = () => (
    <div>
        <div class="row workflow-row flip-in-phone">
            <div class="col-md-6 col-sm-12 workflow-column-description">
            <h2 class="workflow-heading">Easy to Apply</h2>
            <h3 class="workflow-description"><span>Simple and hasslefree Visa Application experience.</span><br/><br/>
                <ul>
                <li>Know documents required</li><br/>
                <li>Instantly upload your documents</li><br/>
                </ul><span>AND DONE!</span>
            </h3>
            </div>
            <div class="col-md-6 col-sm-12 workflow-column-image"><img src="/ops-app/images/easy.png" class="workflow-image"/></div>
        </div>
        <hr/>
        <div class="row workflow-row">
            <div class="col-md-6 col-sm-12 workflow-column-image"><img src="/ops-app/images/expert.png" class="workflow-image"/></div>
            <div class="col-md-6 col-sm-12 workflow-column-description">
            <h2 class="workflow-heading">Expert Guidance</h2>
            <h3 class="workflow-description"> <span>Get your documents reviewed. Negate the mistakes.</span><br/><br/>
                <ul>
                <li>Form Filling</li><br/>
                <li>Cover Letter Drafting</li><br/>
                <li>Appointment Booking</li><br/>
                </ul><span>Get all the prerequisites done by an expert.</span>
            </h3>
            </div>
        </div>
        <hr/>
        <div class="row workflow-row flip-in-phone">
            <div class="col-md-6 col-sm-12 workflow-column-description">
            <h2 class="workflow-heading">Pick up & Drop</h2>
            <h3 class="workflow-description"> <span>Doorstep pickup & drop of your documents.</span><br/><br/>
                <ul>
                <li>Your preferred time</li><br/>
                <li>Regular updates about your Visa Application</li><br/>
                </ul><span>Be assured of a seamless experience at the lowest cost.</span>
            </h3>
            </div>
            <div class="col-md-6 col-sm-12 workflow-column-image"><img src="/ops-app/images/logistic.png" class="workflow-image"/></div>
        </div>
    </div>
);

export default WorkFlowDescription;