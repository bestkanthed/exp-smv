import React from 'react'
import { connect } from 'react-redux';

import { fetchComments, postComment } from '../../../actions/expert' 

const mapStateToProps = state => ({ comments : state.expert.comments })
const mapDispatchToProps = dispatch => ({
    postComment : comment => dispatch(postComment(comment)),
    fetchComments: idDocument => dispatch(fetchComments(idDocument))
})

function prettyDate(date){
    let newDate = new Date(date)
    let minutes = newDate.getMinutes()
    if(minutes.length === 1) minutes = '0' + minutes
    const time = newDate.getHours()+':'+newDate.getMinutes();
    return (newDate.getDate()+'-'+(newDate.getMonth()+1)+'-'+(newDate.getFullYear())).concat(' on '.concat(time));
}

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
            <div >
            <div class='comments' style={{height:'80vh'}}>
                {
                    fetching ?
                    null :
                    fetched ?
                    document ?
                    comments.map(comment => 
                        <div class={`comment alert ${comment.by==='expert' ? 'alert':'alert-info'}`} key={comment._id}>
                            <p>{comment.text}</p>
                            <p>{comment.time}</p>
                            <p>{`${comment.sentBy[0].name} commented at ${prettyDate(comment.updatedAt)}`}</p>
                        </div>
                    ) :
                    null :
                    <h2>Error connecting to the server</h2>
                }
                </div>
                <div style={{paddingLeft:'5%'}}>
                <form class='post-comment row' style={{position:'absolute',bottom: '7%',backgroundColor:'#f0f0f2', padding:'5%'}}>
                    <input style={{width:'80%', height:'20%', borderRadius:'10px'}}class='col-lg-10'type="text" name="comment" id="comment" placeholder="Add comment" required="required"
                        ref = {node => {
                        newComment = node;
                        }}
                    />
                    <button class='post-comment-button col-lg-2' onClick={e => {
                        e.preventDefault();
                        if(!newComment.value) return alert('Please write something in the comment')
                        postComment({text: newComment.value, idDocument, idCustomer});
                        newComment.value = '';
                    }}>Fly</button>
                </form>
            </div>
        </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)