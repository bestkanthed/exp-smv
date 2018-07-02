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
  let idExpert, invoiceNo, noOfApplications, story
  return (
    <div class='update-order'>
        { 
            order.customer.length ?
            <div class='mask row order-edit' style={{paddingTop:'4px'}}>
                <div class={'col-lg-' + (supportView ? 2 : 3) }>
                    <p><strong>{order.customer[0].name}</strong></p>
                    <p><strong>{order.customer[0].phone}</strong></p>
                    <p><strong>{order.customer[0].email}</strong></p>
                </div>
                <div class={'col-lg-' + (supportView ? 3 : 5)}>
                    <div class='row'>
                        <p class='col-lg-12'> Story </p>
                        <textarea class='col-lg-12' type="text" defaultValue={order.story} ref = {node => { story = node }}/>
                    </div>
                </div>
                {
                    supportView ?
                    <div class='col-lg-3'>
                        <label>Visa Expert : </label><select defaultValue={order.idExpert} ref = {node => { idExpert = node }}>
                            {
                                experts ? 
                                experts.map(exp => 
                                    <option key={exp._id} value={exp._id} > {exp.name} </option>
                                ) :
                                null
                            }
                        </select>
                    </div> :
                    null
                }
                <div class='col-lg-2'>
                    <p>Invoice No </p> 
                    <input type="text" defaultValue={order.invoiceNo} ref = {node => { invoiceNo = node }}/>
                </div>
                <div class='col-lg-2'>            
                    <button type='button' onClick = {() => {
                        supportView ?
                        updateOrder({
                            _id: order._id, idExpert: idExpert.value, invoiceNo: invoiceNo.value, story: story.value
                        }) :
                        updateOrder({
                            _id: order._id, invoiceNo: invoiceNo.value, story: story.value
                        })
                    }} class="btn btn-primary show-requirements-button">
                        Update
                    </button>
                    {
                        supportView ?
                        <button type='button' onClick = {() => { if(confirm("Are you sure you want to delete")) { deleteOrder(order._id); window.location.href = '/expert/orders?idExpert='+order.idExpert}} } class="btn btn-primary show-requirements-button"> Delete </button>
                        : null
                    }
                </div>
            </div> :
            null
        }
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderUpdate);