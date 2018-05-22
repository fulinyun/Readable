import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuidv1 from 'uuid/v1'
import Api from '../apis'

class EditPost extends Component {
  state = {
    ready: false,
    category: '',
    title: '',
    body: '',
    author: '',
  }

  constructor(props) {
    super(props)

    this.updateCategory = this.updateCategory.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateBody = this.updateBody.bind(this);
    this.updateAuthor = this.updateAuthor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount () {
    const { postId } = this.props.match.params
    const { categories, dispatch } = this.props
    if (postId) {
      Api.fetchPost(postId).then(post => {
        const { category, title, body, author } = post
        this.setState({ category, title, body, author, ready: true })
      })
    } else {
      if (categories === undefined || categories.length === 0) {
        Api.fetchCategories(dispatch).then(_ => this.setState({ ready: true }))
      } else {
        this.setState({ ready: true })
      }
    }
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
    const { postId } = this.props.match.params
    const { history } = this.props
    if (postId) {
      this.editPost(postId).then(_ => history.goBack())
    } else {
      this.createPost().then(_ => history.goBack())
    }
  }

  close (e) {
    e.preventDefault()
    this.props.history.goBack()
  }

  editPost = (postId) => {
    const { title, body } = this.state
    return Api.editPost(postId, title, body)
  }  

  createPost = () => {
    const id = uuidv1()
    const timestamp = Date.now()
    const { title, body, author, category } = this.state

    return Api.createPost({ id, timestamp, title, body, author, category })
  }

  render() {
    const { categories } = this.props
    const { postId } = this.props.match.params
    const { ready, category, title, body, author } = this.state
    if (ready && category === '') this.setState({ category: categories[0].path })

    return ready ? (
      <div>
        <p>
          <label>Category:</label>
          <select
            value={category}
            onChange={this.updateCategory}
            disabled={postId ? true : false}
          >
            {categories.map((category) => (
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
            disabled={postId ? true : false}
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

function mapStateToProps ({ categories }) {
  return {
    categories: categories.categories,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
