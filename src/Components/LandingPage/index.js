import React from 'react'
import { Grid } from 'react-styled-flexboxgrid'

// Components
import Header from './Header'
import Features from './Features'
import HowTo from './HowTo'
import Subscriptions from './Subscriptions'
import Footer from './Footer'

// CSS
import './LandingPage.scss'

class LandingPage extends React.Component {
  render () {
    return (
      <Grid fluid styleName="landing-page">
        <Header />
        <Features />
        <HowTo />
        <Subscriptions />
        <Footer />
      </Grid>
    )
  }
}

export default LandingPage
