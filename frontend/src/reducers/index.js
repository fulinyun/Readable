import { combineReducers } from 'redux'
import { FETCH_CATEGORIES, FETCH_CATEGORY_POSTS, FETCH_POSTS, FETCH_POST, UNSELECT_POST, UNSELECT_CATEGORY, FETCH_POST_COMMENTS, FETCH_COMMENT, UNSELECT_COMMENT } from '../actions'

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

function category (state = {}, { type, category, posts }) {
  switch (type) {
    case FETCH_CATEGORY_POSTS:
      return {
        category,
        posts,
      }
    case UNSELECT_CATEGORY:
      return {}
    default:
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

function post (state = {}, { type, post, comments }) {
  switch (type) {
    case FETCH_POST:
      return {
        ...state,
        post,
      }
    case UNSELECT_POST:
      return {}
    case FETCH_POST_COMMENTS:
      return {
        ...state,
        comments,
      }
    default:
      return state
  }
}

function comment (state = {}, { type, comment }) {
  switch (type) {
    case FETCH_COMMENT:
      return {
        comment,
      }
    case UNSELECT_COMMENT:
      return {}
    default:
      return state
  }
}

export default combineReducers({
  categories,
  category,
  posts,
  post,
  comment,
})
