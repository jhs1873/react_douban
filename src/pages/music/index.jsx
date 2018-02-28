import React, { Component } from 'react'
class Music extends Component {
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

  getDetail (e) {
    const target = e.target
    const wrap = this.closest(target, '.musicList')
    const id = wrap.getAttribute('data-id')
    console.log(id)
    let url = 'https://api.douban.com/v2/music/' + id
    this.props.getDetail && this.props.getDetail(url)
  }

  render () {
    let curritem = this.props.list
    console.log(curritem)
    return (
      <div className='musicList' data-id={curritem.id} onClick={this.getDetail.bind(this)}>
        <div className='img'>
          <img src={curritem.image} />
        </div>
        <div className='info'>
          <p>名称: <span>{curritem.title}</span></p>
          <p>作者: {
            curritem.author.map((item, index) => {
              return <span className='author' key={index}>{item.name}</span>
            })}
          </p>
          <p>评分: <span>{curritem.rating.average}</span></p>
        </div>
      </div>
    )
  }
}
export default Music
