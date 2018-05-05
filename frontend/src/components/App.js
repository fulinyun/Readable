import React, { Component } from 'react'
import { connect } from 'react-redux'

class App extends Component {
  state = {}

  render() {
    return (
      <div>
        Hello World
      </div>
    )
  }
}

function mapStateToProps () {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
