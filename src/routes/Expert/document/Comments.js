import React from 'react'

import { addComment } from '../../../actions/expert' 

const mapDispatchToProps = dispatch => ({
    addComment : comment => {
        dispatch(addComment(comment))
    }
})

/**
 * The link to documnet.id will only be acessible by respective visa expert and customer
 */

const Comments = ({ comments }) => {
    let newComment;
    return (
        <div class='comments'>
            {
                comments ?
                comments.map(comment => 
                    <div class='comment' key={comment.id}>
                        <p>{comment.text}</p>
                        <p>{comment.time}</p>
                        <p>{comment.sentBy}</p>
                    </div>
                ) :
                <h2> Error connecting the server </h2>
            }
            <form class='add-comment'>
                <input type="text" name="comment" id="comment" placeholder="Add comment" required="required"
                    ref = {node => {
                    newComment = node;
                    }}
                />
                <button class='add-comment-button' onClick={() => addComment(newComment.value)}>Fly</button>
            </form>
        </div>
    )
}

export default Comments