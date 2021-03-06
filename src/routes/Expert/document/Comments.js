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
    let mast = 'AM'
    let minutes = (newDate.getMinutes()).toString()
    let month = (newDate.getMonth() + 1).toString()
    let dates = (newDate.getDate()).toString()
    let hours = (newDate.getHours()).toString()
    
    if(minutes.length === 1) minutes = '0' + minutes
    if(month.length === 1) month = '0' + month
    if(dates.length === 1) dates = '0' + dates
    if(hours > 12) {
        mast = 'PM'
        hours = hours - 12
    }

    return ( hours+':'+minutes+mast+' '+(dates+'-'+month+'-'+(newDate.getFullYear())) )
}

class Comments extends React.Component {

    componentWillMount () {
        let { fetchComments, idDocument } = this.props
        fetchComments(idDocument)
    }
    
    render () {
        let newComment
        let { idDocument, postComment, fetchComments, idCustomer, past } = this.props
        let { fetching, fetched, comments, rerender } = this.props.comments
        if (rerender) fetchComments(idDocument)
        return (
            <div>
            <div class='comments' style={{height:'73.4vh', overflow:'scroll'}}>
                {
                    fetching ?
                    null :
                    fetched ?
                    document ?
                    comments.map(comment => 
                        <div class={`comment alert ${comment.by==='expert' ? 'alert':'alert-info'}`} key={comment._id}>
                            <p>{comment.text}</p>
                            <hr/>
                            <p style={{display: 'inline'}}>{comment.time} {prettyDate(comment.updatedAt)}</p>
                            <p style = {{float : 'right', margin:'0px'}}>{`${comment.sentBy[0].name}`}</p>
                        </div>
                    ) :
                    null :
                    <h2>Error connecting to the server</h2>
                }
                </div>
                

                { past ? null : <div>
                    <form class='post-comment' style={{backgroundColor:'#f0f0f2', padding:'5%'}}>
                        <input style={{width:'85%', padding:'2%', border : 'none', borderRadius:'6px', outline : 'none'}} type="text" name="comment" id="comment" placeholder="Add comment" required="required"
                            ref = {node => {
                            newComment = node;
                            }}
                        />
                        <div style={{backgroundColor : '#f0f0f2', display : 'inline'}} onClick={e => {
                            e.preventDefault();
                            if(!newComment.value) return alert('Please write something in the comment')
                            postComment({text: newComment.value, idDocument, idCustomer});
                            newComment.value = '';
                        }}><img src='../../../ops-app/images/send-button-hover.png' style={{marginLeft : '7%', border:'none'}}/></div>
                    </form>
                </div> }
        </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)