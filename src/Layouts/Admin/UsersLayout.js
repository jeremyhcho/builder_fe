import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Components
import { Users } from 'Components/Admin'

const AnnouncementLayout = () => (
  <Switch>
    <Route exact path='/admin/users' component={Users} />
  </Switch>
)

export default AnnouncementLayout
