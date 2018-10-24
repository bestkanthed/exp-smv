import React from 'react'
import './Support/support.scss'

class TrackUsVisa extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <span>
            <div class="col-lg-3"/>
            <div class="col-sm-12 col-md-6 col-lg-9">
                <div>
                    <a style={{margin : "none"}} href="https://stampmyvisa.com">
                    <img style={{width : "40%", marginLeft:"14.5%", padding : "2%"}} src="/ops-app/images/smv_logo.png"/>
                    </a>
                </div>
                <div>
                    <iframe style={{border : "none", minWidth : "69%", minHeight : "-webkit-fill-available", overflow:"hidden"}} src = "https://ceac.state.gov/CEACStatTracker/Status.aspx"/>
                </div>
            </div>
            </span>
        )
    }
}

export default TrackUsVisa