import React, { Component } from 'react'
import uuidv1 from 'uuid/v1'
import { connect } from 'react-redux'
import Api from '../apis'

class EditComment extends Component {
  state = {
    ready: false,
    body: '',
    author: '',
  }

  constructor(props) {
    super(props)

    this.updateBody = this.updateBody.bind(this);
    this.updateAuthor = this.updateAuthor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount () {
    const { commentId } = this.props.match.params

    if (commentId) {
      Api.fetchComment(commentId).then(({ body, author }) => this.setState({ body, author, ready: true}))
    } else {
      this.setState({ ready: true })
    }
  }

  updateBody (e) {
    this.setState({ body: e.target.value })
  }

  updateAuthor (e) {
    this.setState({ author: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    const { dispatch, match, history } = this.props
    const { postId, commentId } = match.params

    commentId ?
      this.editComment(commentId).then(_ => Api.fetchComments(dispatch, postId)).then(history.goBack()) :
      this.createComment(postId).then(_ => Api.fetchComments(dispatch, postId)).then(history.goBack())
  }

  close (e) {
    e.preventDefault()
    this.props.history.goBack()
  }

  editComment = (id) => Api.editComment(id, Date.now(), this.state.body)
  
  createComment = (postId) => {
    const id = uuidv1()
    const timestamp = Date.now()
    const { body, author } = this.state
    const parentId = postId

    return Api.createComment({ id, timestamp, body, author, parentId })
  }

  render() {
    const { commentId } = this.props.match.params
    const { ready, body, author } = this.state

    return ready ? (
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
            disabled={commentId ? true : false}
          />
        </p>
        <p>
          <button onClick={this.handleSubmit}>Submit</button>
          <button onClick={this.close}>Close</button>
        </p>
      </div>
    ) : <div><p>Loading...</p></div>
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
  }
}

export default connect(null, mapDispatchToProps)(EditComment)
