import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Categories from './Categories'
import Posts from './Posts'
import Api from '../apis'

class Category extends Component {
  state = {
    ready: false,
  }

  componentDidMount () {
    Api.fetchCategories(this.props.dispatch).then(_ => this.setState({ ready: true }))
  }

  render() {
    const { categoryPath } = this.props.match.params
    const { categories } = this.props
    const { ready } = this.state

    return (
      <div>
        <Categories />
        {ready ?
          (<div>
            <h2>
              Showing only posts under category {categories.filter(category => category.path === categoryPath)[0].name}
            </h2>
            <Posts categoryPath={categoryPath} />
          </div>) :
          (<div><p>Loading category details...</p></div>)}
        <div><p><Link to='/new_post'>Create new post</Link></p></div>
        <div><p><Link to='/'>Back</Link></p></div>
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
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
