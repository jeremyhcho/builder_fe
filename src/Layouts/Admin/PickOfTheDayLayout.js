import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Components
import {
  PickOfTheDay,
  CreatePickOfTheDay,
  EditPickOfTheDay
} from 'Components/Admin'

const PickOfTheDayLayout = () => (
  <Switch>
    <Route exact path='/admin/potd' component={PickOfTheDay} />
    <Route exact path='/admin/potd/new' component={CreatePickOfTheDay} />
    <Route exact path='/admin/potd/edit/:id' component={EditPickOfTheDay} />
  </Switch>
)

export default PickOfTheDayLayout
