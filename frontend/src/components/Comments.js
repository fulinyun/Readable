import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Api from '../apis'

class Comments extends Component {
  state = {
    ready: false,
  }

  componentDidMount () {
    const { dispatch, postId } = this.props
    Api.fetchComments(dispatch, postId).then(_ => this.setState({ ready: true }))
  }

  upVoteComment = (id) => (e) => {
    e.preventDefault()
    Api.upVoteComment(id).then(_ => Api.fetchComments(this.props.dispatch, this.props.postId))
  }

  downVoteComment = (id) => (e) => {
    e.preventDefault()
    Api.downVoteComment(id).then(_ => Api.fetchComments(this.props.dispatch, this.props.postId))
  }

  deleteComment = (id) => (e) => {
    e.preventDefault()
    Api.deleteComment(id).then(_ => Api.fetchComments(this.props.dispatch, this.props.postId))
  }

  render() {
    const { categoryPath, postId, comments } = this.props
    const { ready } = this.state

    return ready ? (
      <div>
        <h3>Comments</h3>
        {comments.map(comment => (
          <div key={comment.id}>
            <p>{comment.body}</p>
            <p>{comment.author} - {new Date(comment.timestamp).toString()}</p>
            <p>Vote score: {comment.voteScore}</p>
            <p>
              <button onClick={this.upVoteComment(comment.id)}>UpVote</button>
              <button onClick={this.downVoteComment(comment.id)}>DownVote</button>
              <Link to={`/${categoryPath}/${postId}/${comment.id}/edit`}>Edit</Link>
              <button onClick={this.deleteComment(comment.id)}>Delete</button>
            </p>
          </div>
        ))}
      </div>
    ) : <div><p>Loading comments...</p></div>
  }
}

function mapStateToProps ({ comments }) {
  return {
    comments: comments.comments,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
