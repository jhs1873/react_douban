import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import routeIndex from './route'
import Rindex from './pages/index'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={routeIndex}>
      <IndexRoute component={Rindex} />
      <Route path='/book' component={Rindex} />
      <Route path='/movie' component={Rindex} />
      <Route path='/music' component={Rindex} />
    </Route>
  </Router>
  , document.getElementById('root')
)
