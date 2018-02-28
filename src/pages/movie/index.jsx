import React, { Component } from 'react'

class Movie extends Component {
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

  getId (e) {
    const target = e.target
    const wrap = this.closest(target, '.movieList')
    const id = wrap.getAttribute('data-id')
    let url = 'https://api.douban.com/v2/movie/subject/' + id
    this.props.getDetail && this.props.getDetail(url)
  }

  render () {
    let curritem = this.props.list
    console.log(curritem)
    return (
      <div className='movieList' data-id={curritem.id} onClick={this.getId.bind(this)}>
        <div className='img'>
          <img src={curritem.images.small} />
        </div>
        <div className='title'>
          <p>{curritem.title} - {curritem.year}</p>
          <p>
            {curritem.genres.map((item, index) => {
              return <span className='tag' key={index}>{item}</span>
            })}
          </p>
          <p>
            {curritem.casts.map((item, index) => {
              return <span key={index}>{item.name}</span>
            })}
          </p>
          <p>评分: <span>{curritem.rating.average}</span></p>
        </div>
      </div>
    )
  }
}
export default Movie
