import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Settings from './pages/Settings'

const Routes: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/home" component={Home}/>
        <Route path="/settings" component={Settings}/>

      </Switch>

    </HashRouter>
  )
}

export default Routes
