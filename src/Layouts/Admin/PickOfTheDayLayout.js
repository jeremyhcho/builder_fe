import React from 'react'
import { Route, Switch } from 'react-router-dom'

import {
  PickOfTheDay,
  CreatePickOfTheDay
} from 'Components/Admin'

const PickOfTheDayLayout = () => (
  <Switch>
    <Route exact path='/admin/potd' component={PickOfTheDay} />
    <Route exact path='/admin/potd/new' component={CreatePickOfTheDay} />
  </Switch>
)

export default PickOfTheDayLayout
