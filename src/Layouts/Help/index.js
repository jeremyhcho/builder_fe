import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Help from 'Component/Common'

const HelpLayout = () => (
  <Switch>
    <Route to='/help' component={Help} />
  </Switch>
)

export default HelpLayout
