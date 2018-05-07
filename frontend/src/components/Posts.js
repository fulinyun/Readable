import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { fetchPosts, fetchCategoryPosts, fetchPost, fetchPostComments } from '../actions'
import Post from './Post'

class Posts extends Component {
  state = {
    sortVoteScore: 1,
    sortTimestamp: 1,
    postModalOpen: false,
  }

  getPostsToShow = () => {
    const { category, posts } = this.props
    if (category.category) {
      return category.posts
    } else {
      return posts
    }
  }

  sortByScore = (e) => {
    e.preventDefault()

    const { category, posts, fetchPosts, fetchCategoryPosts } = this.props
    const { sortVoteScore } = this.state

    const sortPostFunc = (post1, post2) => ((post1.voteScore - post2.voteScore) * sortVoteScore)

    if (category.category) {
      fetchCategoryPosts(category.category, category.posts.sort(sortPostFunc))
    } else {
      fetchPosts(posts.sort(sortPostFunc))
    }

    this.setState(() => ({
      sortVoteScore: -sortVoteScore,
    }))
  }

  sortByTime = (e) => {
    e.preventDefault()

    const { category, posts, fetchPosts, fetchCategoryPosts } = this.props
    const { sortTimestamp } = this.state

    const sortPostFunc = (post1, post2) => ((post1.timestamp - post2.timestamp) * sortTimestamp)

    if (category.category) {
      fetchCategoryPosts(category.category, category.posts.sort(sortPostFunc))
    } else {
      fetchPosts(posts.sort(sortPostFunc))
    }

    this.setState(() => ({
      sortTimestamp: -sortTimestamp,
    }))
  }

  fetchPost = (id) => (e) => {
    if (!id) {
      return
    }

    e.preventDefault()

    fetch(`http://localhost:3001/posts/${id}`)
      .then(response => response.json())
      .then(post => this.props.fetchPost(post))
      .then(_ => this.fetchPostComments(id))
  }

  fetchPostComments (id) {
    fetch(`http://localhost:3001/posts/${id}/comments`)
      .then(response => response.json())
      .then(comments => this.props.fetchPostComments(comments))
      .then(_ => this.openPostModal())
  }

  openPostModal = () => this.setState(() => ({ postModalOpen: true }))
  closePostModal = () => this.setState(() => ({ postModalOpen: false }))

  generateSnippet = (content) => (content.length < 20 ? content : content.slice(0, 18) + '...')

  render() {
    const { postModalOpen } = this.state
    const posts = this.getPostsToShow()

    return (posts.length === 0 ? <div>There is no posts in this category.</div> :
      <div>
        <h1>Posts:</h1>
        <table>
        <thead>
        <tr>
          <th>Category</th>
          <th>Title</th>
          <th>Author</th>
          <th>Body</th>
          <th>Comment count</th>
          <th>Vote score<button onClick={this.sortByScore}>Sort</button></th>
          <th>Timestamp<button onClick={this.sortByTime}>Sort</button></th>
          <th>Details</th>
        </tr>
        </thead>
        <tbody>
        {posts && posts.map(post => (
          <tr key={post.id}>
            <td>{post.category}</td>
            <td>{post.title}</td>
            <td>{post.author}</td>
            <td>{this.generateSnippet(post.body)}</td>
            <td>{post.commentCount}</td>
            <td>{post.voteScore}</td>
            <td>{new Date(post.timestamp).toString()}</td>
            <td><button onClick={this.fetchPost(post.id)}>Details</button></td>
          </tr>
        ))}
        </tbody>
        </table>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={postModalOpen}
          onRequestClose={this.closePostModal}
          contentLabel='Modal'
        >
          {postModalOpen && <Post closeModal={this.closePostModal} />}
        </Modal>
      </div>
    )
  }
}

function mapStateToProps ({ category, posts }) {
  return {
    category,
    posts: posts.posts ? posts.posts : [],
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: (posts) => dispatch(fetchPosts(posts)),
    fetchCategoryPosts: (category, posts) => dispatch(fetchCategoryPosts({ category, posts })),
    fetchPost: (post) => dispatch(fetchPost(post)),
    fetchPostComments: (comments) => dispatch(fetchPostComments(comments)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
