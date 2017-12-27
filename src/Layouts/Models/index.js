import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Components
import Models from 'Components/Models'

const ModelsLayout = () => (
  <Switch>
    <Route exact path='/models' component={Models} />
  </Switch>
)

export default ModelsLayout
