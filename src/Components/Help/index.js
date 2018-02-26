import React from 'react'
import { Route, Switch } from 'react-router-dom'

import './Help.scss'

const Help = () => (
  <main styleName="help-section">
    <Switch>
      <Route to='/help/tos' component={Tos} />
    </Switch>
  </main>
)

export default Help
