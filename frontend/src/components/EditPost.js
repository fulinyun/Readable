import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchPost } from '../actions'
import uuidv1 from 'uuid/v1'

class EditPost extends Component {
  constructor(props) {
    super(props)

    if (props.post.post) {
      this.state = props.post.post
    } else {
      this.state = {
        category: props.categories.categories[0].path,
        title: '',
        body: '',
        author: '',
      }
    }

    this.updateCategory = this.updateCategory.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateBody = this.updateBody.bind(this);
    this.updateAuthor = this.updateAuthor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
  }

  updateCategory (e) {
    this.setState({ category: e.target.value })
  }
  updateTitle (e) {
    this.setState({ title: e.target.value })
  }

  updateBody (e) {
    this.setState({ body: e.target.value })
  }

  updateAuthor (e) {
    this.setState({ author: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()

    this.props.post.post && this.props.post.post.id ? this.editPost(this.props.post.post.id) : this.createPost()
    this.props.closeModal()
  }

  close (e) {
    e.preventDefault()

    this.props.closeModal()
  }

  editPost = (id) => {
    fetch(
      `http://localhost:3001/posts/${id}`,
      {
        method: 'PUT',
        headers: { 'content-type': 'application/json', 'Authorization': 'whatever-you-want' },
        body: JSON.stringify({ title: this.state.title, body: this.state.body }),
      }
    )
      .then(response => response.json())
      .then(_ => this.fetchPost(id))
      .then(_ => this.fetchPosts())
  }

  createPost = () => {
    const timestamp = Date.now()
    const { title, body, author, category } = this.state

    fetch(
      'http://localhost:3001/posts',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'Authorization': 'whatever-you-want' },
        body: JSON.stringify({
          id: uuidv1(),
          timestamp,
          title,
          body,
          author,
          category,
        }),
      }
    )
      .then(response => response.json())
      .then(_ => this.fetchPosts())
  }

  fetchPost = (id) => {
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
    const { categories, post } = this.props
    const { category, title, body, author } = this.state

    return (
      <div>
        <p>
          <label>Category:</label>
          <select
            value={category}
            onChange={this.updateCategory}
            disabled={post.post ? true : false}
          >
            {categories.categories.map((category) => (
              <option
                key={category.path}
                value={category.path}
              >
                {category.name}
              </option>
            ))}
          </select>
        </p>
        <p>
          <label>Title:</label>
          <input
            type='text'
            placeholder='Post title'
            value={title}
            onChange={this.updateTitle}
          />
        </p>
        <p>
          <label>Body:</label>
          <input
            type='textarea'
            placeholder='Post body'
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
            disabled={post.post ? true : false}
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

function mapStateToProps ({ categories, post }) {
  return {
    categories,
    post,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: (posts) => dispatch(fetchPosts(posts)),
    fetchPost: (post) => dispatch(fetchPost(post)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
