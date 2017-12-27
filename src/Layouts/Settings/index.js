import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Components
import Settings from 'Components/Settings'

const SettingsLayout = () => (
  <Switch>
    <Route exact path='/settings' component={Settings} />
  </Switch>
)

export default SettingsLayout
