import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { unselectPost, fetchPosts, fetchCategoryPosts } from '../actions'
import Comments from './Comments'
import EditPost from './EditPost'
import EditComment from './EditComment'

class Post extends Component {
  state = {
    editPostModalOpen: false,
    editCommentModalOpen: false,
  }

  editPost = (e) => {
    e.preventDefault()

    this.setState({editPostModalOpen: true})
  }

  deletePost = (e) => {
    e.preventDefault()

    const { category, post } = this.props

    fetch(`http://localhost:3001/posts/${post.post.id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(_ => this.props.closeModal())
      .then(_ => this.fetchPosts())
      .then(_ => category.category && this.fetchCategoryPosts(category.category))
      .then(_ => this.props.unselectPost())
  }

  fetchPosts () {
    fetch('http://localhost:3001/posts')
      .then(response => response.json())
      .then(posts => this.props.fetchPosts(posts))
  }

  fetchCategoryPosts (category) {
    fetch(`http://localhost:3001/${category}/posts`)
      .then(response => response.json())
      .then(posts => this.props.fetchCategoryPosts(category, posts))
  }

  addComment = (e) => {
    e.preventDefault()

    this.setState({editCommentModalOpen: true})
  }

  close = (e) => {
    e.preventDefault()
    
    const { closeModal, unselectPost } = this.props

    closeModal()
    unselectPost()
  }

  closeEditPostModal = () => {
    this.setState({editPostModalOpen: false})
  }

  closeEditCommentModal = () => {
    this.setState({editCommentModalOpen: false})
  }

  render() {
    const { title, author, body, voteScore, commentCount } = this.props.post.post
    const { editPostModalOpen, editCommentModalOpen } = this.state

    return (
      <div>
        <h3>{title}</h3>
        <h4>{author}</h4>
        <p>{body}</p>
        <p>Vote score: {voteScore}</p>
        <p>{commentCount} comments</p>
        <p>
          <button onClick={this.editPost}>Edit</button>
          <button onClick={this.deletePost}>Delete</button>
        </p>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={editPostModalOpen}
          onRequestClose={this.closeEditPostModal}
          contentLabel='Modal'
        >
          {editPostModalOpen && <EditPost closeModal={this.closeEditPostModal} />}
        </Modal>
        <Comments />
        <p>
          <button onClick={this.addComment}>Add a comment</button>
          <button onClick={this.close}>Close</button>
        </p>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={editCommentModalOpen}
          onRequestClose={this.closeEditCommentModal}
          contentLabel='Modal'
        >
          {editCommentModalOpen && <EditComment closeModal={this.closeEditCommentModal} />}
        </Modal>
      </div>
    )
  }
}

function mapStateToProps ({ category, post }) {
  return {
    category,
    post,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    unselectPost: () => dispatch(unselectPost()),
    fetchPosts: (posts) => dispatch(fetchPosts(posts)),
    fetchCategoryPosts: (category, posts) => dispatch(fetchCategoryPosts({ category, posts })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
