import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { fetchComment, fetchPostComments, fetchPost, fetchPosts } from '../actions'
import EditComment from './EditComment'

class Comments extends Component {
  state = {
    commentModalOpen: false,
  }

  closeCommentModal = () => this.setState({commentModalOpen: false})
  openCommentModal = () => this.setState({commentModalOpen: true})

  editComment = (id) => (e) => {
    e.preventDefault()

    fetch(`http://localhost:3001/comments/${id}`, { headers: { 'Authorization': 'whatever-you-want' } })
      .then(response => response.json())
      .then(comment => this.props.fetchComment(comment))
      .then(_ => this.openCommentModal())
  }

  deleteComment = (id, parentId) => (e) => {
    e.preventDefault()

    fetch(`http://localhost:3001/comments/${id}`, { method: 'DELETE', headers: { 'Authorization': 'whatever-you-want' } })
      .then(response => response.json())
      .then(_ => this.fetchPostComments(parentId))
      .then(_ => this.fetchPost(parentId))
      .then(_ => this.fetchPosts())
  }

  fetchPostComments (id) {
    fetch(`http://localhost:3001/posts/${id}/comments`, { headers: { 'Authorization': 'whatever-you-want' } })
      .then(response => response.json())
      .then(comments => this.props.fetchPostComments(comments))
  }

  fetchPost (id) {
    fetch(`http://localhost:3001/posts/${id}`, { headers: { 'Authorization': 'whatever-you-want' } })
      .then(response => response.json())
      .then(post => this.props.fetchPost(post))
  }

  fetchPosts () {
    fetch('http://localhost:3001/posts', { headers: { 'Authorization': 'whatever-you-want' } })
      .then(response => response.json())
      .then(posts => this.props.fetchPosts(posts))
  }

  render() {
    const { post, comments } = this.props
    const { commentModalOpen } = this.state

    return (
      <div>
        <h3>Comments</h3>
        {comments && comments.map(comment => (
          <div key={comment.id}>
            <p>{comment.body}</p>
            <p>{comment.author} - {new Date(comment.timestamp).toString()}</p>
            <p>Vote score: {comment.voteScore}</p>
            <p>
              <button onClick={this.editComment(comment.id)}>Edit</button>
              <button onClick={this.deleteComment(comment.id, post.id)}>Delete</button>
            </p>
          </div>
        ))}
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={commentModalOpen}
          onRequestClose={this.closeCommentModal}
          contentLabel='Modal'
        >
          {commentModalOpen && <EditComment closeModal={this.closeCommentModal} />}
        </Modal>
      </div>
    )
  }
}

function mapStateToProps ({ post }) {
  const { comments } = post

  return {
    post: post.post,
    comments,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchComment: (comment) => dispatch(fetchComment(comment)),
    fetchPostComments: (comments) => dispatch(fetchPostComments(comments)),
    fetchPost: (post) => dispatch(fetchPost(post)),
    fetchPosts: (posts) => dispatch(fetchPosts(posts)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
