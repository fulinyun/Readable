import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchPostComments, unselectComment, fetchPost } from '../actions'
import uuidv1 from 'uuid/v1'

class EditComment extends Component {
  constructor(props) {
    super(props)

    if (props.comment.comment) {
      this.state = props.comment.comment
    } else {
      this.state = {
        body: '',
        author: '',
      }
    }

    this.updateBody = this.updateBody.bind(this);
    this.updateAuthor = this.updateAuthor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
  }

  updateBody (e) {
    this.setState({ body: e.target.value })
  }

  updateAuthor (e) {
    this.setState({ author: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()

    const { post, comment, closeModal, unselectComment } = this.props

    comment.comment && comment.comment.id
      ? this.editComment(comment.comment.id, comment.comment.parentId)
      : this.createComment(post.post.id)
    
    closeModal()
    unselectComment()
  }

  close (e) {
    e.preventDefault()

    const { closeModal, unselectComment } = this.props

    closeModal()
    unselectComment()
  }

  editComment = (id, parentId) => {
    fetch(
      `http://localhost:3001/comments/${id}`,
      {
        method: 'PUT',
        headers: { 'content-type': 'application/json', 'Authorization': 'whatever-you-want' },
        body: JSON.stringify({ timestamp: Date.now(), body: this.state.body }),
      }
    )
      .then(response => response.json())
      .then(_ => this.fetchPostComments(parentId))
      .then(_ => this.fetchPost(parentId))
      .then(_ => this.fetchPosts())
  }

  createComment = (parentId) => {
    const timestamp = Date.now()
    const { body, author } = this.state

    fetch(
      'http://localhost:3001/comments',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'Authorization': 'whatever-you-want' },
        body: JSON.stringify({
          id: uuidv1(),
          timestamp,
          body,
          author,
          parentId,
        }),
      }
    )
      .then(response => response.json())
      .then(_ => this.fetchPostComments(parentId))
      .then(_ => this.fetchPost(parentId))
      .then(_ => this.fetchPosts())
  }

  fetchPostComments = (id) => {
    fetch(`http://localhost:3001/posts/${id}/comments`, { headers: { 'Authorization': 'whatever-you-want' } })
      .then(response => response.json())
      .then(comments => this.props.fetchPostComments(comments))
  }

  fetchPost (id) {
    fetch(`http://localhost:3001/posts/${id}`, { headers: { 'Authorization': 'whatever-you-want' } })
      .then(response => response.json())
      .then(post => this.props.fetchPost(post))
  }

  fetchPosts = () => {
    fetch(`http://localhost:3001/posts`, { headers: { 'Authorization': 'whatever-you-want' } })
      .then(response => response.json())
      .then(posts => this.props.fetchPosts(posts))
  }

  render() {
    const { comment } = this.props
    const { body, author } = this.state

    return (
      <div>
        <p>
          <label>Comment:</label>
          <input
            type='textarea'
            placeholder='Comment body'
            value={body}
            onChange={this.updateBody}
          />
        </p>
        <p>
          <label>Author:</label>
          <input
            type='text'
            placeholder='Author name'
            value={author}
            onChange={this.updateAuthor}
            disabled={comment.comment ? true : false}
          />
        </p>
        <p>
          <button onClick={this.handleSubmit}>Submit</button>
          <button onClick={this.close}>Close</button>
        </p>
      </div>
    )
  }
}

function mapStateToProps ({ post, comment }) {
  return {
    post,
    comment,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: (posts) => dispatch(fetchPosts(posts)),
    fetchPostComments: (comments) => dispatch(fetchPostComments(comments)),
    fetchPost: (post) => dispatch(fetchPost(post)),
    unselectComment: () => dispatch(unselectComment()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComment)
