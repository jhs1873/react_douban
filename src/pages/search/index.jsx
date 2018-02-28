import React, { Component } from 'react'
import './iconfont.js'
require('./index.css')
class Search extends Component {
  constructor () {
    super()
    this.state = {
      value: ''
    }
  }
  getList () {
    console.log('输入的值:' + this.state.value)
    this.props.search && this.props.search(this.state.value)
    this.setState({
      value: ''
    })
  }
  onchange () {
    this.setState({
      value: this.refs.input.value
    })
  }
  render () {
    let placeH = this.props.placeH
    return <div>
      <div className='searchInput'>
        <form className='searchForm'>
          <div className='input'>
            <span><svg className='icon' aria-hidden='true'>
              <use xlinkHref='#icon-search' /></svg>
            </span>
            <input type='text' placeholder={placeH} ref='input' value={this.state.value} onChange={this.onchange.bind(this)} />
          </div>
          <div className='search'><input type='button' value='搜索' className='search-text' onClick={this.getList.bind(this)} /></div>
        </form>
      </div >
    </div>
  }
}

module.exports = Search
