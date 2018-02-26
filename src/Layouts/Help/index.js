import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Help from 'Components/Help'

const HelpLayout = () => (
  <Switch>
    <Route to='/help' component={Help} />
  </Switch>
)

export default HelpLayout
