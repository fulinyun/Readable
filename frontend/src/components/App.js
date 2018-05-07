import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from '../actions'
import Modal from 'react-modal'
import Categories from './Categories'
import Posts from './Posts'
import EditPost from './EditPost'

class App extends Component {
  state = {
    editPostModalOpen: false,
  }
  
  componentDidMount () {
    this.fetchCategories()
    this.fetchPosts()
  }

  fetchCategories = () => {
    fetch('http://localhost:3001/categories')
      .then(response => response.json())
      .then(({ categories }) => this.props.fetchCategories(categories))    
  }

  fetchPosts = () => {
    fetch('http://localhost:3001/posts')
      .then(response => response.json())
      .then(posts => this.props.fetchPosts(posts))
  }

  createNewPost = (e) => {
    e.preventDefault()

    this.openEditPostModal()
  }

  openEditPostModal = () => this.setState(() => ({ editPostModalOpen: true }))
  closeEditPostModal = () => this.setState(() => ({ editPostModalOpen: false }))

  render() {
    const { categories, posts } = this.props
    const { editPostModalOpen } = this.state

    return (
      <div>
        {categories && <Categories />}
        {posts && <Posts />}
        <div><button onClick={this.createNewPost}>Create new post</button></div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={editPostModalOpen}
          onRequestClose={this.closeEditPostModal}
          contentLabel='Modal'
        >
          {editPostModalOpen && <EditPost closeModal={this.closeEditPostModal} />}
        </Modal>
      </div>
    )
  }
}

function mapStateToProps ({ categories, category, posts, post }) {
  return {
    categories: categories.categories,
    category: category.category,
    categoryPosts: category.posts,
    posts: posts.posts ? posts.posts : [],
    post: post.post ? post.post : null,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: (categories) => dispatch(fetchCategories(categories)),
    fetchPosts: (posts) => dispatch(fetchPosts(posts)),
  }
}

Modal.setAppElement('#root')

export default connect(mapStateToProps, mapDispatchToProps)(App)
