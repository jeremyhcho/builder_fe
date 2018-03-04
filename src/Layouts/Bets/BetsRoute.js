import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Components
import Bets from 'Components/Bets'

const GamesRoute = () => (
  <Switch>
    <Route exact path='/bets' component={Bets} />
  </Switch>
)

export default GamesRoute
