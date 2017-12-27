import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Components
import Teams from 'Components/Teams'
import TeamDetails from 'Components/TeamDetails'

const TeamsLayout = () => (
  <Switch>
    <Route exact path='/teams' component={Teams} />
    <Route path='/teams/:id' component={TeamDetails} />
  </Switch>
)

export default TeamsLayout
