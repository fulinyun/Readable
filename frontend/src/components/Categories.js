import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Api from '../apis'

class Categories extends Component {
  state = {
    ready: false,
  }

  componentDidMount () {
    Api.fetchCategories(this.props.dispatch).then(_ => this.setState({ ready: true }))
  }

  render() {
    const { categories } = this.props
    const { ready } = this.state

    return ready ? 
      (<div>
        <h1>Categories:</h1>
        <ul>
        {categories.map(({ name, path }) => (
          <li key={path}>
            <p>
              <Link to={`/${path}`}>
                {name}
              </Link>
            </p>
          </li>
        ))}
        </ul>
      </div>) :
      (<div><p>Loading categories...</p></div>)
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
