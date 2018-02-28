import React, { Component } from 'react'

class Book extends Component {
  getId (e) {
    const target = e.target
    const wrap = this.closest(target, '.listctx')
    const id = wrap.getAttribute('data-id')
    let url = 'https://api.douban.com/v2/book/' + id
    this.props.getDetail && this.props.getDetail(url)
  }
  closest (el, selector) {
    var matchesSelector = el.matches
    while (el) {
      if (matchesSelector.call(el, selector)) {
        break
      }
      el = el.parentNode || el.parentElement
    }
    return el
  }
  render () {
    let curritem = this.props.list
    console.log(curritem)
    return <div>
      <div className='listctx' data-id={curritem.id} onClick={this.getId.bind(this)}>
        <div className='listImg'>
          <img src={curritem.image} />
        </div>
        <div className='info'>
          <p>名称: <span>{curritem.title}</span></p>
          <p className='tag'>
            {curritem.tags.map((item, index) => {
              return <span className='tags' key={index}>{item.name}</span>
            })}
          </p>
          <p>作者: <span>{curritem.author.join(', ')}</span></p>
          <p>评分: <span>{curritem.rating.average}</span></p>
          <p>时间: <span>{curritem.pubdate}</span></p>
        </div>
      </div>
    </div >
  }
}

module.exports = Book
