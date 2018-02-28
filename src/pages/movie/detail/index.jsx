import React, { Component } from 'react'
import '../../search/iconfont.js'
class MovieDetail extends Component {
  exit () {
    this.props.closeDetail && this.props.closeDetail()
  }
  render () {
    let curritem = this.props.detailData
    return (
      <div className='detailTop'>
        <div className='head'>
          <div>{curritem.title}</div>
          <div onClick={this.exit.bind(this)}><span><svg className='icon' aria-hidden='true'>
            <use xlinkHref='#icon-zuojiantou' /></svg>
          </span><span>电影</span></div>
        </div>
        <img className='poster' src={curritem.images.large} />
        <div className='summary'>
          <h3>简介</h3>
          <p className='filmName'>名称: <span>{curritem.title}</span>
            {curritem.genres.map((item, index) => {
              return <span className='genres' key={index}>{item}</span>
            })}
          </p>
          上映时间: <span>{curritem.year}</span>
          <p>导演: {
            curritem.directors.map((item, index) => {
              return <span className='directors' key={index}>{item.name}</span>
            })
          }</p>
          <span>{curritem.title}({curritem.original_title})</span>
        </div>
        {curritem.casts[0].avatars ? <div className='casts'>
          <h3>演员</h3>
          <div className='avatars'>
            {
              curritem.casts.map((item, index) => {
                return <img className='avatar' key={index} src={item.avatars.large} />
              })
            }
          </div>
        </div>
          : <div className='casts' />
        }

      </div>
    )
  }
}

module.exports = MovieDetail
