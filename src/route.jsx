import React, {Component} from 'react'
class Route extends Component {
  render () {
    return <div>
      {this.props.children}
    </div>
  }
}

module.exports = Route
