import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Comments from './Comments'
import Api from '../apis'

class Post extends Component {
  state = {
    ready: false,
    post: {},
  }

  componentDidMount () {
    const { postId } = this.props.match.params

    Api.fetchPost(postId).then(post => this.setState({ ready: true, post }))
  }

  upVotePost = (e) => {
    e.preventDefault()
    const { postId } = this.props.match.params

    Api.upVotePost(postId).then(post => this.setState({ post }))
  }

  downVotePost = (e) => {
    e.preventDefault()
    const { postId } = this.props.match.params

    Api.downVotePost(postId).then(post => this.setState({ post }))
  }

  deletePost = (e) => {
    e.preventDefault()
    const { postId } = this.props.match.params

    Api.deletePost(postId).then(_ => this.props.history.goBack())
  }

  goBack = (e) => {
    e.preventDefault()
    this.props.history.goBack()
  }

  render() {
    const { categoryPath, postId } = this.props.match.params
    const { ready, post } = this.state
    const { title, author, body, voteScore, commentCount } = post

    return ready ? (
      title ? (
        <div>
          <h3>{title}</h3>
          <h4>{author}</h4>
          <p>{body}</p>
          <p>Vote score: {voteScore}</p>
          <p>{commentCount} comments</p>
          <p>
            <button onClick={this.upVotePost}>UpVote</button>
            <button onClick={this.downVotePost}>DownVote</button>
            <Link to={`/${categoryPath}/${postId}/edit`}>Edit</Link>
            <button onClick={this.deletePost}>Delete</button>
          </p>
          <Comments categoryPath={categoryPath} postId={postId} />
          <div><p>
            <Link to={`/${categoryPath}/${postId}/new_comment`}>Add a comment</Link>
          </p></div>
          <div><p>
            <button onClick={this.goBack}>Back</button>
          </p></div>
        </div>
      ) : <div><p>This post has been deleted.</p></div>
    ) : <div><p>Loading post information...</p></div>
  }
}

export default Post
