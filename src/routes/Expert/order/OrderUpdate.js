import React from 'react';
import { connect } from 'react-redux';
import { updateOrder, deleteOrder } from '../../../actions/expert';
import './ApplicationSummary.scss';

const mapStateToProps = state => ({ experts : state.support.experts.experts })

const mapDispatchToProps = dispatch => ({
    updateOrder: order => dispatch(updateOrder(order)),
    deleteOrder: id => dispatch(deleteOrder(id))
})

let OrderUpdate = ({ updateOrder, deleteOrder, order, supportView, experts }) => {
  let idExpert, invoiceNo, travelDate, noOfApplications, story
  return (
    <div class='update-order'>
        {
            supportView ?
            <div>
                <label>No of Applications:</label><input type="number" required="required" defaultValue={order.noOfApplications} ref = {node => { noOfApplications = node }}/>
                <label>Visa Expert : </label><select defaultValue={order.idExpert} ref = {node => { idExpert = node }}>
                    {
                        experts ? 
                        experts.map(exp => 
                            <option key={exp._id} value={exp._id} > {exp.name} </option>
                        ) :
                        null
                    }
                </select>
                <button type='button' onClick = {() => { if(confirm("Are you sure you want to delete")) { deleteOrder(order._id); window.location.href = '/expert/orders?idExpert='+order.idExpert}} } class="btn btn-primary show-requirements-button"> Delete </button>
            </div> :
            null
        }
        { 
            order.customer.length ?
            <div class='mask row'>
                <div class='col-lg-3'>
                    <p><strong>{order.customer[0].name}</strong></p>
                    <p><strong>{order.customer[0].phone}</strong></p>
                    <p><strong>{order.customer[0].email}</strong></p>
                </div>
                <div class='col-lg-6'>
                    <div class='row'>
                        <p class='col-lg-2'> Story </p>
                        <input class='col-lg-12' type="text" defaultValue={order.story} ref = {node => { story = node }}/>
                    </div>
                </div>
                <div class='col-lg-2'>
                    <p>Invoice No </p> 
                    <input type="text" defaultValue={order.invoiceNo} ref = {node => { invoiceNo = node }}/>
                </div>
                <button class='col-lg-1' type='button' onClick = {() => {
                    supportView ?
                    updateOrder({
                        _id: order._id, noOfApplications: noOfApplications.value, idExpert: idExpert.value, invoiceNo: invoiceNo.value,
                        story: story.value, travelDate: travelDate.value
                    }) :
                    updateOrder({
                        _id: order._id, invoiceNo: invoiceNo.value, story: story.value,travelDate: travelDate.value
                    })
                }} class="btn btn-primary show-requirements-button">
                    Update
                </button>
            </div> :
            null
        }
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderUpdate);