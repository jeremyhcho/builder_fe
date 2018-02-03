import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// Components
import { Announcements } from 'Components/Admin'

const GamesLayout = () => (
  <Switch>
    <Route exact path='/admin/announcements' component={Announcements} />
    <Redirect to='/admin/announcements' />
  </Switch>
)

export default GamesLayout
