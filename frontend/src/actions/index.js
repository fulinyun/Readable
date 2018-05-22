export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'

export function fetchCategories (categories) {
  return {
    type: FETCH_CATEGORIES,
    categories,
  }
}

export function fetchPosts (posts) {
  return {
    type: FETCH_POSTS,
    posts,
  }
}

export function fetchComments (comments) {
  return {
    type: FETCH_COMMENTS,
    comments,
  }
}
