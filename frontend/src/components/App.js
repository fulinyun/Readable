import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Category from './Category'
import Post from './Post'
import EditPost from './EditPost'
import EditComment from './EditComment'
import Main from './Main'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          path='/new_post'
          component={EditPost}
        />
        <Route
          exact path='/:categoryPath'
          component={Category}
        />
        <Route
          exact path='/:categoryPath/:postId'
          component={Post}
        />
        <Route
          path='/:categoryPath/:postId/edit'
          component={EditPost}
        />
        <Route
          path='/:categoryPath/:postId/new_comment'
          component={EditComment}
        />
        <Route
          path='/:categoryPath/:postId/:commentId/edit'
          component={EditComment}
        />
        <Route 
          exact path='/'
          component={Main}
        />
      </Switch>
    )
  }
}

export default App
