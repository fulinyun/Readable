import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Categories from './Categories'
import Posts from './Posts'

class Main extends Component {
  render() {
    return (
      <div>
        <Categories />
        <Posts categoryPath='' />
        <div><p><Link to='/new_post'>Create new post</Link></p></div>
      </div>
    )
  }
}

export default Main
