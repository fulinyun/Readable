import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Api from '../apis'

class Posts extends Component {
  state = {
    ready: false,
    sortVoteScore: 1,
    sortTimestamp: 1,
    sortedPosts: [],
  }

  componentDidMount () {
    Api.fetchPosts(this.props.dispatch).then(_ => this.setState({ ready: true }))
  }

  getFilteredPosts = () => {
    const { posts, categoryPath } = this.props

    if (categoryPath === '') {
      return posts
    } else {
      return posts.filter(post => post.category === categoryPath)
    }
  }

  sortByScore = (e) => {
    e.preventDefault()
    const { sortVoteScore } = this.state
    const sortPostFunc = (post1, post2) => ((post1.voteScore - post2.voteScore) * sortVoteScore)

    this.setState({
      sortedPosts: this.getFilteredPosts().sort(sortPostFunc),
      sortVoteScore: -sortVoteScore,
    })
  }

  sortByTime = (e) => {
    e.preventDefault()
    const { sortTimestamp } = this.state
    const sortPostFunc = (post1, post2) => ((post1.timestamp - post2.timestamp) * sortTimestamp)

    this.setState({
      sortedPosts: this.getFilteredPosts().sort(sortPostFunc),
      sortTimestamp: -sortTimestamp,
    })
  }

  generateSnippet = (content) => (content.length < 20 ? content : content.slice(0, 18) + '...')

  deletePost = (postId) => (e) => {
    e.preventDefault()
    Api.deletePost(postId)
      .then(deletedPost => {
        if (deletedPost.deleted) {
          this.setState(
            { sortedPosts: this.state.sortedPosts.filter(post => post.id !== deletedPost.id) },
            () => Api.fetchPosts(this.props.dispatch))
        }
      })
  }

  upVotePost = (postId) => (e) => {
    e.preventDefault()
    Api.upVotePost(postId)
      .then(votedPost => this.setState({ sortedPosts: this.state.sortedPosts.map(post => {
        if (post.id === votedPost.id) {
          return votedPost
        } else {
          return post
        }
      })}, () => Api.fetchPosts(this.props.dispatch)))
  }

  downVotePost = (postId) => (e) => {
    e.preventDefault()
    Api.downVotePost(postId)
      .then(votedPost => this.setState({ sortedPosts: this.state.sortedPosts.map(post => {
        if (post.id === votedPost.id) {
          return votedPost
        } else {
          return post
        }
      })}, () => Api.fetchPosts(this.props.dispatch)))
  }

  renderPosts = (posts) => {
    if (posts.length === 0) {
      return (<div><p>There is no posts in this category.</p></div>)
    } else {
      return (<div>
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
          <th>Edit/Delete</th>
          <th>Vote</th>
        </tr>
        </thead>
        <tbody>
        {posts.map(post => (
          <tr key={post.id}>
            <td>{post.category}</td>
            <td>{post.title}</td>
            <td>{post.author}</td>
            <td>{this.generateSnippet(post.body)}</td>
            <td>{post.commentCount}</td>
            <td>{post.voteScore}</td>
            <td>{new Date(post.timestamp).toString()}</td>
            <td><Link to={`/${post.category}/${post.id}`}>Details</Link></td>
            <td>
              <Link to={`/${post.category}/${post.id}/edit`}>Edit</Link>
              <button onClick={this.deletePost(post.id)}>Delete</button>
            </td>
            <td>
              <button onClick={this.upVotePost(post.id)}>UpVote</button>
              <button onClick={this.downVotePost(post.id)}>DownVote</button>
            </td>
          </tr>
        ))}
        </tbody>
        </table>
      </div>)
    }
  }

  render() {
    const { ready, sortedPosts } = this.state

    if (ready) {
      if (sortedPosts.length === 0) {
        return this.renderPosts(this.getFilteredPosts())
      } else {
        return this.renderPosts(sortedPosts)
      }
    } else {
      return (<div><p>Loading posts...</p></div>)
    }
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts: posts.posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
