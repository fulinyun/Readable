export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS'
export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POST = 'FETCH_POST'
export const UNSELECT_POST = 'UNSELECT_POST'
export const UNSELECT_CATEGORY = 'UNSELECT_CATEGORY'
export const FETCH_POST_COMMENTS = 'FETCH_POST_COMMENTS'
export const FETCH_COMMENT = 'FETCH_COMMENT'
export const UNSELECT_COMMENT = 'UNSELECT_COMMENT'

export function fetchCategories (categories) {
  return {
    type: FETCH_CATEGORIES,
    categories,
  }
}

export function fetchCategoryPosts ({ category, posts }) {
  return {
    type: FETCH_CATEGORY_POSTS,
    category,
    posts,
  }
}

export function fetchPosts (posts) {
  return {
    type: FETCH_POSTS,
    posts,
  }
}

export function fetchPost (post) {
  return {
    type: FETCH_POST,
    post,
  }
}

export function unselectPost () {
  return {
    type: UNSELECT_POST,
  }
}

export function unselectCategory () {
  return {
    type: UNSELECT_CATEGORY,
  }
}

export function fetchPostComments (comments) {
  return {
    type: FETCH_POST_COMMENTS,
    comments,
  }
}

export function fetchComment (comment) {
  return {
    type: FETCH_COMMENT,
    comment,
  }
}

export function unselectComment () {
  return {
    type: UNSELECT_COMMENT,
  }
}
