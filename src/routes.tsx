import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import NewContributor from './pages/NewContributor'
import Settings from './pages/Settings'
import Pool from './pages/Pool'
import Movement from './pages/Movement'
import NewMovement from './pages/NewPayment'

export const routes = {
  login: '/',
  home: '/home',
  settings: '/settings',
  newContributor: '/contributor/new',
  pool: '/pool',
  movement: '/movement',
  newMovement: '/movement/new',
}

const Routes: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path={routes.login} exact component={Login} />
        <Route path={routes.home} component={Home} />
        <Route path={routes.settings} component={Settings} />
        <Route path={routes.newContributor} component={NewContributor} />
        <Route path={routes.pool} component={Pool} />
        <Route path={routes.newMovement} component={NewMovement} />
        <Route path={routes.movement} component={Movement} />
      </Switch>
    </HashRouter>
  )
}

export default Routes
