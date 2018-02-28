import React, {Component} from 'react'
class RouteIndex extends Component {
  render () {
    return <div>
      {this.props.children}
    </div>
  }
}

module.exports = RouteIndex
