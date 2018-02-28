import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'

import Search from '../search'
import Nav from '../nav'
import Book from '../book'
import BookDetail from '../book/detail'
import Movie from '../movie'
import MovieDetail from '../movie/detail'
import Music from '../music'
import MusicDetail from '../music/detail'

class Rindex extends Component {
  constructor () {
    super()
    this.state = {
      list: [],
      bookUrl: 'https://api.douban.com/v2/book/search?q=腾讯&fields=id,title,tags,author,rating,pubdate,image',
      movieUrl: 'https://api.douban.com/v2/movie/top250?',
      musicUrl: 'https://api.douban.com/v2/music/search?tag=欧美',
      detail: false,
      detailData: [],
      pathname: 0,
      more: false,
      moreEnd: false,
      start: 0,
      count: 5,
      searchUrl: '',
      searchMore: false

    }
  }

  componentDidMount () {
    let locationPath = this.props.location.pathname
    let url = ''
    switch (locationPath) {
      case '/book':
        this.setState({ pathname: 0 })
        url = this.state.bookUrl
        break
      case '/movie':
        this.setState({ pathname: 1 })
        url = this.state.movieUrl
        break
      case '/music':
        this.setState({ pathname: 2 })
        url = this.state.musicUrl
        break
      default:
        url = this.state.bookUrl
        break
    }
    this.getList(url)
  }
  tabIndex (value) {
    console.log(value)
    this.setState({ list: [], start: 0, count: 5 })
    let url = ''
    switch (value) {
      case '0':
        this.setState({ pathname: 0 })
        url = this.state.bookUrl
        break
      case '1':
        this.setState({ pathname: 1 })
        url = this.state.movieUrl
        break
      case '2':
        this.setState({ pathname: 2 })
        url = this.state.musicUrl
        break
    }
    this.getList(url)
  }

  getList (url) {
    this.setState({ more: false })
    console.log(url)
    fetchJsonp(url + '&start=0' + '&count=5'
    ).then((response) => {
      return response.json()
    }).then((json) => {
      console.log(json)
      let data = []
      switch (this.state.pathname) {
        case 0:
          data = json.books
          break
        case 1:
          data = json.subjects
          break
        case 2:
          data = json.musics
          break
        default:
          data = json.books
          break
      }
      var listNew = this.state.list.concat(data)
      this.setState({
        list: listNew,
        more: true
      })
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  getDetail (url) {
    fetchJsonp(url
    ).then((response) => {
      return response.json()
    }).then((json) => {
      console.log(json)
      this.setState({
        detailData: json,
        detail: true
      })
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  closeDetailPage () {
    this.setState({
      detail: false
    })
  }

  search (value) {
    this.refs.content.scrollTop = 0
    this.setState({ list: [], searchValue: value })
    let searchUrl = ''
    switch (this.state.pathname) {
      case 0:
        searchUrl = 'https://api.douban.com/v2/book/search?q='
        break
      case 1:
        searchUrl = 'https://api.douban.com/v2/movie/search?q='
        break
      case 2:
        searchUrl = 'https://api.douban.com/v2/music/search?q='
        break
      default:
        searchUrl = 'https://api.douban.com/v2/book/search?q='
        break
    }
    let url = ''
    url = searchUrl + value + '&start=0' + '&count=5'
    this.setState({ searchUrl: searchUrl, searchMore: true })
    this.getList(url)
  }
  more () {
    let url = ''
    if (this.state.searchMore) {
      url = this.state.searchUrl + this.state.searchValue
    } else {
      let locationPath = this.props.location.pathname
      console.log(locationPath)
      url = ''
      switch (locationPath) {
        case '/book':
          url = this.state.bookUrl
          break
        case '/movie':
          url = this.state.movieUrl
          break
        case '/music':
          url = this.state.musicUrl
          break
        default:
          url = this.state.bookUrl
          break
      }
    }
    let count = this.state.count
    let start = count + this.state.start
    this.setState({ more: false })
    console.log(url)
    fetchJsonp(url + '&start=' + start + '&count=' + count
    ).then((response) => {
      return response.json()
    }).then((json) => {
      console.log(json)
      let data = []
      switch (this.state.pathname) {
        case 0:
          data = json.books
          break
        case 1:
          data = json.subjects
          break
        case 2:
          data = json.musics
          break
        default:
          data = json.books
          break
      }
      var listNew = this.state.list.concat(data)
      if (json.total < count) {
        this.setState({ moreEnd: true,
          more: true,
          start: start,
          list: listNew})
      } else {
        this.setState({
          list: listNew,
          more: true,
          start: start
        })
      }
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }
  render () {
    let items = this.state.list
    let search = ''
    let detail = ''
    let list = []
    switch (this.state.pathname) {
      case 0:
        search = <Search placeH='作者、书名、ISBN' search={this.search.bind(this)} />
        if (this.state.detail) {
          detail = <BookDetail detailData={this.state.detailData}
            closeDetail={this.closeDetailPage.bind(this)} />
        }
        list = items.map((item, index) => {
          return <Book list={item} key={index} getDetail={this.getDetail.bind(this)} />
        })
        break
      case 1:
        search = <Search placeH='电影、影院、电视剧' search={this.search.bind(this)} />
        if (this.state.detail) {
          detail = <MovieDetail detailData={this.state.detailData}
            closeDetail={this.closeDetailPage.bind(this)} />
        }
        list = items.map((item, index) => {
          return <Movie list={item} key={index} getDetail={this.getDetail.bind(this)} />
        })
        break
      case 2:
        search = <Search placeH='唱片名、表演者、条码、ISRC' search={this.search.bind(this)} />
        if (this.state.detail) {
          detail = <MusicDetail detailData={this.state.detailData}
            closeDetail={this.closeDetailPage.bind(this)} />
        }
        list = items.map((item, index) => {
          return <Music list={item} key={index} getDetail={this.getDetail.bind(this)} />
        })
        break
    }
    if (!this.state.detail) {
      var nav = <Nav tabIndex={this.tabIndex.bind(this)} />
    }
    return (<div>
      {search}
      <div className='content' ref='content'>
        {list}
        {this.state.more
          ? this.state.moreEnd ? <div className='more'>无更多内容</div> : <div className='more' onClick={this.more.bind(this)}>点击加载更多...</div>
          : <div className='more'>加载中</div>
        }
      </div>
      {detail}
      {nav}
    </div>
    )
  }
}

export default Rindex
