import React from 'react'
import { Route } from 'react-router-dom'

// Components
import Dashboard from 'Components/Dashboard'

const DashboardRoute = () => (
  <Route exact path='/dashboard' component={Dashboard} />
)

export default DashboardRoute
