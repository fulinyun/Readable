import { combineReducers } from 'redux'
import {} from '../actions'

function X (state = {}, action) {
  switch (action.type) {
    default :
      return state
  }
}

function Y (state = {}, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  X,
  Y,
})
