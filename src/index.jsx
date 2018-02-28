import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import RouteIndex from './route'
import Rindex from './pages/index'
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={RouteIndex}>
      <IndexRoute component={Rindex} />
      <Route path='/book' component={Rindex} />
      <Route path='/movie' component={Rindex} />
      <Route path='/music' component={Rindex} />
    </Route>
  </Router>
  , document.getElementById('root')
)
