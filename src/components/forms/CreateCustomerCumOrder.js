import React from 'react';
import { connect } from 'react-redux';
import { postCustomerCumOrder } from '../../actions/support';
import axios from 'axios';

const mapStateToProps = state => {
    return {
        experts: state.support.experts
    }
}

const mapDispatchToProps = dispatch => {
  return {
    postCustomerCumOrder: form => dispatch(postCustomerCumOrder(form))
  }
}

let CreateCustomerCumOrder = ({experts, postCustomerCumOrder}) => {
  let idExpert, channel, name, email, phone, orderType, invoiceNo, noOfApplications, countries, travelDate, story;
  return (
    <div class="row login-form">
      <div class="col-lg-12">
        <form id="login_form" class="show-requirements">
          <h1>Create Customer Account & Order</h1>
          <div class="row create-order-form">
            <div class="col-sm-12">
                <select name="channel" id="channel" placeholder="Channel" required="required" class="form-control"
                    ref = {node => {
                    channel = node;
                    }}
                >
                    <option value='B2'>B2B</option>
                    <option value='B2C'>B2C</option>
                    <option value='Corporate'>Corporate</option>
                </select>
            </div>
            <div class="col-sm-12">
                <select name="idExpert" id="idExpert" class="form-control"
                    ref = {node => {
                    idExpert = node;
                    }}
                >
                    {
                        experts.fetching ?
                        null :
                        experts.fetched ?
                        experts.experts ?
                        experts.experts.map(exp => 
                            <option key={exp._id} value={exp._id} > {exp.name} </option>
                        ) :
                        null :
                        null
                    }
                </select>
            </div>
            <div class="col-sm-12">
              <input type="text" name="name" id="name" placeholder="Customer Name" required="required" class="form-control"
                ref = {node => {
                  name = node;
                }}
              />
            </div>
            <div class="col-sm-12">
                <input type="email" name="email" id="email" placeholder="Email ID" required="required" class="form-control"
                    ref = {node => {
                        email = node;
                    }}
                />
            </div>
            <div class="col-sm-12">
                <input type="text" name="phone" id="phone" placeholder="Contact No" required="required" class="form-control"
                    ref = {node => {
                        phone = node;
                    }}
                />
            </div>
            <div class="col-sm-12">
                <input type="text" name="orderType" id="orderType" placeholder="Order Type" required="required" class="form-control"
                    ref = {node => {
                        orderType = node;
                    }}
                />
            </div>
            <div class="col-sm-12">
                <input type="text" name="invoiceNo" id="invoiceNo" placeholder="Invoice No" class="form-control"
                    ref = {node => {
                        invoiceNo = node;
                    }}
                />
            </div>
            <div class="col-sm-12">
                <input type="number" name="noOfApplications" id="noOfApplications" placeholder="No of Applications" required="required" class="form-control"
                    ref = {node => {
                        noOfApplications = node;
                    }}
                />
            </div>
            <div class="col-sm-12">
                <select multiple name="countries" id="countries" required="required" class="form-control"
                    ref = {node => {
                        countries = node;
                    }}
                >
                    <option value='Singapore'> Singapore </option>
                    <option value='Malaysia'> Malaysia </option>
                    <option value='US'> USA </option>
                    <option value='Thailand'> Thailand </option>
                </select>
            </div>
            <div class="col-sm-12">
                <input type="date" name="travelDate" id="travelDate" required="required" class="form-control"
                    ref = {node => {
                        travelDate = node;
                    }}
                />
            </div>
            <div class="col-sm-12">
                <input type="text" name="story" id="story" placeholder='Story' required="required" class="form-control"
                    ref = {node => {
                        story = node;
                    }}
                />
            </div>
            <div class="col-sm-6">
                <button type='button' onClick = {() => { 
                    let options = [].slice.call(countries.querySelectorAll('option'));
                    let selected = options.filter(option => option.selected);
                    let selectedCountries = selected.map(option => option.value);

                    postCustomerCumOrder({
                        customer: {
                            channel: channel.value,
                            name: name.value,
                            email: email.value,
                            phone: phone.value
                        },
                        order: {
                            idExpert: idExpert.value,
                            orderType: orderType.value,
                            invoiceNo: invoiceNo.value,
                            noOfApplications: noOfApplications.value,
                            countries: selectedCountries,
                            travelDate: travelDate.value,
                            story: story.value
                        }
                })}} id='submitLogin' class="btn btn-primary show-requirements-button">
                    Create Customer and Order
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomerCumOrder);