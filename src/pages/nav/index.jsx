import React, { Component } from 'react'
import { Link } from 'react-router'
require('../style.css')

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      navList: [
        {
          path: '/book',
          txt: '图书',
          query: '0'
        },
        {
          path: '/movie',
          txt: '电影',
          query: '1'
        },
        {
          path: '/music',
          txt: '音乐',
          query: '2'
        }
      ],
      activeIndex: 0
    }
  }
  tabindex (index) {
    this.props.tabIndex(index)
    this.setState({
      activeIndex: index
    })
  }
  render () {
    let activeIndex = this.state.activeIndex
    let navList = this.state.navList
    return <div>
      <div className='nav'>
        <ul className='nav-ul'>
          {
            navList.map((item, index) => {
              return <li key={index}><Link to={{ pathname: item.path, state: item.query }}
                className={index === activeIndex ? 'active' : ''}
                activeClassName='active' onClick={() => { this.tabindex(item.query) }}><i /><span
                  className='txt'>{item.txt}</span></Link></li>
            })
          }
        </ul>
      </div>
    </div>
  }
}

module.exports = Index
