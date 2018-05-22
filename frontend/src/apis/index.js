import { fetchCategories, fetchPosts, fetchComments } from '../actions'

const authObj = { 'Authorization': 'whatever-you-want' }
const writeHeaders = { 'content-type': 'application/json', ...authObj }

const Api = {
  fetchCategories: function (dispatch) {
    return fetch(
      'http://localhost:3001/categories',
      { headers: authObj }
    ).then(response => response.json())
      .then(({ categories }) => dispatch(fetchCategories(categories)))
  },

  fetchPosts: function (dispatch) {
    return fetch(
      'http://localhost:3001/posts',
      { headers: authObj }
    ).then(response => response.json())
      .then(posts => dispatch(fetchPosts(posts)))
  },

  fetchComments: function (dispatch, postId) {
    return fetch(
      `http://localhost:3001/posts/${postId}/comments`,
      { headers: authObj }
    ).then(response => response.json())
      .then(comments => dispatch(fetchComments(comments)))
  },

  fetchPost: function (postId) {
    return fetch(
      `http://localhost:3001/posts/${postId}`,
      { headers: authObj }
    ).then(response => response.json())
  },

  deletePost: function (postId) {
    return fetch(
      `http://localhost:3001/posts/${postId}`,
      {
        method: 'DELETE',
        headers: authObj,
      }
    ).then(response => response.json())
  },

  upVotePost: function (postId) {
    return fetch(
      `http://localhost:3001/posts/${postId}`,
      {
        method: 'POST',
        headers: writeHeaders,
        body: JSON.stringify({ option: 'upVote' }),
      }
    ).then(response => response.json())
  },

  downVotePost: function (postId) {
    return fetch(
      `http://localhost:3001/posts/${postId}`,
      {
        method: 'POST',
        headers: writeHeaders,
        body: JSON.stringify({ option: 'downVote' }),
      }
    ).then(response => response.json())
  },

  editPost: function (postId, title, body) {
    return fetch(
      `http://localhost:3001/posts/${postId}`,
      {
        method: 'PUT',
        headers: writeHeaders,
        body: JSON.stringify({ title, body }),
      }
    ).then(response => response.json())
  },

  createPost: function ({ id, timestamp, title, body, author, category }) {
    return fetch(
      'http://localhost:3001/posts',
      {
        method: 'POST',
        headers: writeHeaders,
        body: JSON.stringify({
          id,
          timestamp,
          title,
          body,
          author,
          category,
        }),
      }
    ).then(response => response.json())
  },

  fetchComment: function (id) {
    return fetch(
      `http://localhost:3001/comments/${id}`,
      { headers: authObj }
    ).then(response => response.json())
  },

  upVoteComment: function (id) {
    return fetch(
      `http://localhost:3001/comments/${id}`,
      {
        method: 'POST',
        headers: writeHeaders,
        body: JSON.stringify({
          option: 'upVote',
        }),
      }
    ).then(response => response.json())
  },

  downVoteComment: function (id) {
    return fetch(
      `http://localhost:3001/comments/${id}`,
      {
        method: 'POST',
        headers: writeHeaders,
        body: JSON.stringify({
          option: 'downVote',
        }),
      }
    ).then(response => response.json())
  },

  deleteComment: function (id) {
    return fetch(
      `http://localhost:3001/comments/${id}`,
      { method: 'DELETE', headers: authObj }
    ).then(response => response.json())
  },

  editComment: function (id, timestamp, body) {
    return fetch(
      `http://localhost:3001/comments/${id}`,
      {
        method: 'PUT',
        headers: writeHeaders,
        body: JSON.stringify({ timestamp, body }),
      }
    ).then(response => response.json())
  },

  createComment: function ({ id, timestamp, body, author, parentId }) {
    return fetch(
      'http://localhost:3001/comments',
      {
        method: 'POST',
        headers: writeHeaders,
        body: JSON.stringify({
          id,
          timestamp,
          body,
          author,
          parentId,
        }),
      }
    ).then(response => response.json())
  },

}

export default Api
