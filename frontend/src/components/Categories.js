import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { fetchCategoryPosts } from '../actions'
import CategoryDetails from './CategoryDetails'

class Categories extends Component {
  state = {
    categoryModalOpen: false,
  }

  fetchCategoryPosts = (category) => (e) => {
    if (!category) {
      return
    }

    e.preventDefault()

    fetch(`http://localhost:3001/${category}/posts`)
      .then(response => response.json())
      .then(posts => this.props.fetchCategoryPosts(category, posts))
      .then(_ => this.openCategoryModal())
  }

  openCategoryModal = () => this.setState(() => ({ categoryModalOpen: true }))
  closeCategoryModal = () => this.setState(() => ({ categoryModalOpen: false }))

  render() {
    const { categories } = this.props
    const { categoryModalOpen } = this.state

    return (
      <div>
        <h1>Categories:</h1>
        <ul>
        {categories && categories.map(category => (
          <li key={category.path}>
            <p>
              {category.name}
              <button onClick={this.fetchCategoryPosts(category.path)}>Details</button>
            </p>
          </li>
        ))}
        </ul>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={categoryModalOpen}
          onRequestClose={this.closeCategoryModal}
          contentLabel='Modal'
        >
          {categoryModalOpen && <CategoryDetails closeModal={this.closeCategoryModal} />}
        </Modal>
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  return {
    categories: categories.categories,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategoryPosts: (category, posts) => dispatch(fetchCategoryPosts({ category, posts })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
