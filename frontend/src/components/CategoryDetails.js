import React, { Component } from 'react'
import { connect } from 'react-redux'
import Posts from './Posts'
import { unselectCategory } from '../actions'

class CategoryDetails extends Component {
  close = (e) => {
    e.preventDefault()

    const { closeModal, unselectCategory } = this.props
    closeModal()
    unselectCategory()
  }

  render() {
    const { category } = this.props

    return (
      <div>
        <h2>
          Category: {category.category}
        </h2>
        <Posts />
        <p><button onClick={this.close}>Close</button></p>
      </div>
    )
  }
}

function mapStateToProps ({ category }) {
  return {
    category,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    unselectCategory: () => dispatch(unselectCategory()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetails)
