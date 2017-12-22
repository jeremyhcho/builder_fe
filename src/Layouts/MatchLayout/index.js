import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Components
import Matches from 'Components/Matches'
import MatchDetails from 'Components/MatchDetails'

const matchSectionStyle = {
  backgroundColor: 'var(--lightest-gray)',
}

const MatchLayout = () => (
  <div style={matchSectionStyle}>
    <Switch>
      <Route exact path='/matches' component={Matches} />
      <Route path='/matches/:id' component={MatchDetails} />
    </Switch>
  </div>
)

export default MatchLayout
