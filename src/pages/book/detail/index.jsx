import React, { Component } from 'react'
import '../../search/iconfont.js'
class MovieDetail extends Component {
  exit () {
    this.props.closeDetail && this.props.closeDetail()
  }

  render () {
    let curritem = this.props.detailData
    return (
      <div className='bookDetail'>
        <div className='head'>
          <div>{curritem.title}</div>
          <div onClick={this.exit.bind(this)}><span><svg className='icon' aria-hidden='true'>
            <use xlinkHref='#icon-zuojiantou' /></svg>
          </span><span>电影</span></div>
        </div>
        <div className='bookContext'>
          <div className='header'>
            <img src={curritem.image} />
            <div className='info'>
              <p>名称: <span>{curritem.title}</span></p>
              <p>作者: <span>{curritem.author.join(', ')}</span></p>
              <p>出版社: <span>{curritem.publisher}</span></p>
              <p>日期: <span>{curritem.pubdate}</span></p>
              <p>评分: <span>{curritem.rating.average}</span></p>
              <p>价钱: <span>{curritem.price}</span></p>
              <p>
                {curritem.tags.map((item, index) => {
                  return <span className='tags' key={index}>{item.name}</span>
                })}
              </p>
            </div>
          </div>
          <div className='cata'>
            <h2>序言</h2>
            <p>{curritem.catalog}</p>
          </div>
          <div className='j'>
            <h2>简介</h2>
            <p>{curritem.summary}</p>
          </div>
        </div>
      </div>

    )
  }
}
module.exports = MovieDetail
