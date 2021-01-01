import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import NewContributor from './pages/NewContributor'
import Pool from './pages/Pool'
import Payments from './pages/Payments'
import NewPayment from './pages/NewPayment'
import EditContributor from './pages/EditContributor'
import PrintPdf from './pages/PrintPdf'
import EditPayment from './pages/EditPayment'

export const routes = {
  login: '/',
  home: '/home',
  settings: '/settings',
  newContributor: '/contributor/new',
  editContributor: '/contributor/edit/:id',
  pool: '/pool',
  payment: '/payment',
  newPayment: '/payment/new',
  print: '/print/:id',
  editPayment: '/payment/edit',
}

const Routes: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path={routes.login} exact component={Login} />
        <Route path={routes.home} component={Home} />
        <Route path={routes.settings} component={PrintPdf} />
        <Route path={routes.newContributor} component={NewContributor} />
        <Route path={routes.editContributor} component={EditContributor} />
        <Route path={routes.pool} component={Pool} />
        <Route path={routes.editPayment} component={EditPayment} />
        <Route path={routes.newPayment} component={NewPayment} />
        <Route path={routes.payment} component={Payments} />
        <Route path={routes.print} component={PrintPdf} />
      </Switch>
    </HashRouter>
  )
}

export default Routes
