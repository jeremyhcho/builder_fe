import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Components
import Models from 'Components/Models'
import CreateModel from 'Components/Models/CreateModel'

const ModelsLayout = () => (
  <Switch>
    <Route exact path='/models' component={Models} />
    <Route exact path='/models/create' component={CreateModel} />
  </Switch>
)

export default ModelsLayout
