import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Components
import GamesListRoute from './GamesListRoute'
import GameDetails from 'Components/GameDetails'

const GamesRoute = () => (
  <Switch>
    <Route exact path='/games' component={GamesListRoute} />
    <Route path='/games/:id' component={GameDetails} />
  </Switch>
)

export default GamesRoute
