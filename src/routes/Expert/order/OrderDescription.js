import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function prettyDate(date){
    return date ? date.substring(1,11) : null;
}

class OrderDescription extends React.Component {

    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this)
        this.state = {
            dropdownOpen: false
        }
    }
    
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render () {
        let { order, linkedOrders, idCustomer} = this.props
        return (
            <div>       
                <div class='mask row' style={{borderRight:`6px solid ${BorderColor(order.applications.length ? order.applications[0].status : 'Past')}`}}>
                    <Link class='col-lg-1 order-back' to={idCustomer ? '/customer/orders' : '/expert/orders'}>
                        <div class='order-back-div'><img src='../../../images/ic/arrow_back/grey600.png'/></div>
                    </Link>
                    {
                        order.applications.length ?
                        <div class='col-lg-3'  style={{borderLeft:'1px solid #e0e0e0',padding:'2%'}}>
                            <p>{order.applications[0].name}</p>
                            <p>{order.applications[0].country} - {order.applications[0].visaType}</p>
                        </div> : null
                    }
                    <div style={{padding:'2%'}} class='col-lg-2'>
                        <p>Order Id : <br/>{order.orderCode}</p>
                    </div>
                    <div class='col-lg-2' style={{padding:'2%'}}>
                        <p>Status :</p><p>{order.status}</p>
                    </div>
                    <div class='col-lg-2' style={{padding:'2%'}}>
                        <p>Invoice No :</p><p>{order.invoiceNo}</p>
                    </div>
                    {idCustomer ? null : <div class='col-lg-2' style={{padding:'2%'}}>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                Linked Orders
                            </DropdownToggle>
                            <DropdownMenu style={{minWidth:'360px'}}>
                                {
                                    linkedOrders ?
                                    linkedOrders.map(order => 
                                        <Link style={{textDecoration:'none', color:'black'}} to={(idCustomer ? '/customer' : '/expert') + '/orders/'+order._id} >
                                            <div class='mask-2 row' style={{borderRight:`solid 4px ${BorderColor(order.status)}`}}>
                                                <div class='sub-mask row'>
                                                    <div class='col-lg-7 container-fluid'>
                                                        {order.applications.length ? order.applications[0].name : null}  x{order.noOfApplications}
                                                        <br/>
                                                        {`${order.orderType} - ${order.country}`}
                                                    </div>
                                                    <div class='col-lg-4'>
                                                        Order Id: <br/> {order.orderCode}
                                                    </div>
                                                </div>
                                                <br/>
                                                <div class='sub-mask row'>
                                                    <div class='col-lg-7' style={{marginLeft:'3$'}}>
                                                        Travel Date:<br/>
                                                        {prettyDate(JSON.stringify(order.travelDate))}
                                                    </div>
                                                    <div class='col-lg-5'>
                                                        Status:<br/> {order.status}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ) :
                                    null
                                }
                            </DropdownMenu>
                        </Dropdown>
                    </div>}
                </div>
            </div>
        )
    }
}


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

export default OrderDescription;
