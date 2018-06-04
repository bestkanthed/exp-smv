import React from 'react'
import { connect } from 'react-redux';

import { fetchComments, postComment } from '../../../actions/expert' 

const mapStateToProps = state => ({ comments : state.expert.comments })
const mapDispatchToProps = dispatch => ({
    postComment : comment => dispatch(postComment(comment)),
    fetchComments: idDocument => dispatch(fetchComments(idDocument))
})

class Comments extends React.Component {

    componentWillMount () {
        let { fetchComments, idDocument } = this.props
        fetchComments(idDocument)
    }
    
    render () {
        let newComment
        let { idDocument, postComment, fetchComments, idCustomer } = this.props
        let { fetching, fetched, comments, rerender } = this.props.comments
        if (rerender) fetchComments(idDocument)
        return (
            <div class='comments'>
                {
                    fetching ?
                    null :
                    fetched ?
                    document ?
                    comments.map(comment => 
                        <div class='comment' key={comment._id}>
                            <p>{comment.text}</p>
                            <p>{comment.time}</p>
                            <p>{comment.sentBy[0].name}</p>
                        </div>
                    ) :
                    null :
                    <h2>Error connecting to the server</h2>
                }
                <form class='post-comment'>
                    <input type="text" name="comment" id="comment" placeholder="Add comment" required="required"
                        ref = {node => {
                        newComment = node;
                        }}
                    />
                    <button class='post-comment-button' onClick={e => {
                        e.preventDefault();
                        postComment({text :newComment.value, idDocument, idCustomer});
                        newComment.value = '';
                        console.log('logging new comment', newComment.value)
                    }}>Fly</button>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)