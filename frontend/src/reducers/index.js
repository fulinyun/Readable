import { combineReducers } from 'redux'
import { FETCH_CATEGORIES, FETCH_POSTS, FETCH_COMMENTS } from '../actions'

function categories (state = {}, { type, categories }) {
  switch (type) {
    case FETCH_CATEGORIES:
      return {
        categories,
      }
    default :
      return state
  }
}

function posts (state = {}, { type, posts }) {  
  switch (type) {
    case FETCH_POSTS:
      return {
        posts,
      }
    default :
      return state
  }
}

function comments (state = {}, { type, comments }) {
  switch (type) {
    case FETCH_COMMENTS:
      return {
        comments,
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments,
})
