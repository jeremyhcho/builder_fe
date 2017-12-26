import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Components
import Games from 'Components/Games'
import GameDetails from 'Components/GameDetails'

const gamesSection = {
  backgroundColor: 'var(--lightest-gray)',
}

const GamesLayout = () => (
  <div style={gamesSection}>
    <Switch>
      <Route exact path='/games' component={Games} />
      <Route path='/games/:id' component={GameDetails} />
    </Switch>
  </div>
)

export default GamesLayout
