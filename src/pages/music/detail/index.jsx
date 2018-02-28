import React, { Component } from 'react'

import '../../search/iconfont.js'
class MusicDetail extends Component {
  exit () {
    this.props.closeDetail && this.props.closeDetail()
  }
  render () {
    let curritem = this.props.detailData
    return (
      <div className='musicDetail'>
        <div className='head'>
          <div>{curritem.title}</div>
          <div onClick={this.exit.bind(this)}><span><svg className='icon' aria-hidden='true'>
            <use xlinkHref='#icon-zuojiantou' /></svg>
          </span><span>音乐</span></div>
        </div>
        <div className='musicContext'>
          <div className='header'>
            <img src={curritem.image} />
            <div className='info'>
              <p>名称: <span>{curritem.title}</span></p>
              <p>{
                curritem.tags.map((item, index) => {
                  return <span className='tags' key={index}>{item.name}</span>
                })
              }</p>
              <p>作者: {
                curritem.author.map((item, index) => {
                  return <span className='author' key={index}>{item.name} </span>
                })
              }</p>
              <p>发布商: {
                curritem.attrs.publisher.map((item, index) => {
                  return <span className='publisher' key={index}>{item} </span>
                })
              }</p>
              <p>发布时间: <span>{curritem.attrs.pubdate}</span></p>
              <p>评分: <span>{curritem.rating.average}</span></p>
            </div>
          </div>
          <div className='j'>
            <h2>简介</h2>
            <p>{curritem.summary}</p>
          </div>
          <div className='tracks'>
            <h2>内容</h2>
            <p>{curritem.attrs.tracks}</p>
          </div>
        </div>
      </div>

    )
  }
}
module.exports = MusicDetail
