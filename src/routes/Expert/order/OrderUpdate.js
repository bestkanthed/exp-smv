import React from 'react';
import { connect } from 'react-redux';
import { updateOrder, deleteOrder } from '../../../actions/expert';

const mapStateToProps = state => ({ experts : state.support.experts.experts })

const mapDispatchToProps = dispatch => ({
    updateOrder: order => dispatch(updateOrder(order)),
    deleteOrder: id => dispatch(deleteOrder(id))
})

let OrderUpdate = ({ updateOrder, deleteOrder, order, supportView, experts }) => {
  let idExpert, invoiceNo, status, travelDate, noOfApplications, story
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
                <button type='button' onClick = {() => {deleteOrder(order._id); window.location.href = '/expert/orders?idExpert='+order.idExpert}} class="btn btn-primary show-requirements-button"> Delete </button>
            </div> :
            null
        }
        
        <label>Invoice No:</label><input type="text" defaultValue={order.invoiceNo} ref = {node => { invoiceNo = node }}/>
        <label>Story :</label><input type="text" defaultValue={order.story} ref = {node => { story = node }}/>
        <label>Status :</label><select defaultValue={order.status} ref = {node => { status = node }}>
            <option value='To be Reviewed'>To be Reviewed</option>
            <option value='Reviewed: NOT OKAY'>Reviewed: NOT OKAY</option>
            <option value='Pickup Scheduled'>Pickup Scheduled</option>
            <option value='Ready to Submit'>Ready to Submit</option>
            <option value='Submitted'>Submitted</option>
        </select>
        <label>Travel Date :</label><input type="date" defaultValue={order.travelDate  ? order.travelDate.substring(0,10) : null } ref = {node => { travelDate = node}} />
        <button type='button' onClick = {() => {
            supportView ?
            updateOrder({
                _id: order._id, noOfApplications: noOfApplications.value, idExpert: idExpert.value, invoiceNo: invoiceNo.value,
                story: story.value, status: status.value, travelDate: travelDate.value
            }) :
            updateOrder({
                _id: order._id, invoiceNo: invoiceNo.value, story: story.value, status: status.value, travelDate: travelDate.value
            })
        }} class="btn btn-primary show-requirements-button">
            Update
        </button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderUpdate);