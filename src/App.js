import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { BlogHome, Post, NotFound, Payments } from './pages'
import Preview from './Preview'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/blog/payments' component={Payments} />
      <Route exact path='/blog' component={BlogHome} />
      <Route exact path='/preview' component={Preview} />
      <Route exact path='/blog/:uid' component={Post} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
