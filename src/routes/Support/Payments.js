import React from 'react'

class Payments extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h3>
                    Payment Generation
                </h3>
                <div>
                    <input placeholder = 'Name' required />
                    <input placeholder = 'Email' required />
                    <input placeholder = 'Phone Number' required />
                    <br/><hr/>
                    <table>
                        <tr>
                            <td style = {{padding : '1%', border : 'solid 1px black'}}>Services</td>
                            <td style = {{padding : '1%', border : 'solid 1px black'}}>Qauntity</td>
                            <td style = {{padding : '1%', border : 'solid 1px black'}}>Third party charges</td>
                            <td style = {{padding : '1%', border : 'solid 1px black'}}>Per UnitPrice</td>
                            <td style = {{padding : '1%', border : 'solid 1px black'}}>total charge</td>
                        </tr>
                    </table>
                    <br />
                    <button value='generate link'>Generate Payment Link</button>
                </div>
            </div>
        )
    }
}

export default Payments