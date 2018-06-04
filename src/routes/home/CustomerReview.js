import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = (state) => {
    return {
        reviews: state.database.customerReviews
    }
};

const mapDispatchToProps = dispatch => {
    dispatch({
        type: "FETCH_CUSTOMER_REVIEWS",
        payload: axios.get('/api/customer-reviews')
    });
    return {};
};

const initials = name => {
    let initials = name.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return initials;
};

const stars = number => {
    let stars = [];
    let starClass;
    for(let i=0; i<5; i++) {
        if(number > i) starClass = "fa fa-star checked";
        else starClass = "fa fa-star";
        stars.push(
            <span class={starClass}></span>
        );
    }
    return stars;
}

let CustomerReview = ({reviews}) => (
    <div>
        <div class="row">
            <div class="col-lg-12 customers-say">
                <h1>Our customers</h1>
            </div>
        </div>
        <div class="reviews row">
            {reviews ? reviews.map(review => 
                <a key={review.id} href = {review.link} target="_blank" class="col-lg-4 col-sm-12 review">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="row review-meta">
                            <div class="col-lg-2">
                                {
                                    review.image ? 
                                    <img class="review-image" src = {review.image}></img> :
                                    <div class="review-no-image">{initials(review.name)}</div>
                                }
                            </div>
                            <div class="col-lg-5">
                                <div class="reviewer-name">{review.name}</div>
                                <div class="review-stars">
                                    {stars(review.stars)}
                                </div>
                            </div>
                            <div class="col-lg-5">
                                <div class="review-medium"><img src={review.medium}/></div>
                            </div>
                            </div>
                        </div>
                        <div class="col-lg-12 review-content">{review.content}</div>
                    </div>
                </a>
            ) : null}
        </div>
    </div>
);

CustomerReview = connect(mapStateToProps, mapDispatchToProps)(CustomerReview);

export default CustomerReview;