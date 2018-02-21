import React from 'react'
import { Route } from 'react-router-dom'

// Components
import LandingPage from 'Components/LandingPage'

const LandingPageLayout = () => <Route to='/secret' component={LandingPage} />

export default LandingPageLayout
