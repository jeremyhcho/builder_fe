import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Components
import Games from 'Components/Games'
import GameDetails from 'Components/GameDetails'

const GamesLayout = () => (
  <Switch>
    <Route exact path='/games' component={Games} />
    <Route path='/games/:id' component={GameDetails} />
  </Switch>
)

export default GamesLayout
