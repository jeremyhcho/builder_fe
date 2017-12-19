import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Components
import Matches from 'Components/Matches'
import MatchDetails from 'Components/Matches/MatchDetails'

const MatchLayout = () => (
  <Switch>
    <Route exact path='/matches' component={Matches} />
    <Route path='/matches/:id' component={MatchDetails} />
  </Switch>
)

export default MatchLayout
