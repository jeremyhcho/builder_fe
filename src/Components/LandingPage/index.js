import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Grid } from 'react-styled-flexboxgrid'

// Components
import Header from './Header'
import Features from './Features'
import HowTo from './HowTo'
import Subscriptions from './Subscriptions'
import Footer from './Footer'

// CSS
import './LandingPage.scss'

// Helpers
import LandingPageTheme from './LandingPageTheme'

class LandingPage extends React.Component {
  render () {
    return (
      <ThemeProvider theme={LandingPageTheme}>
        <Grid fluid styleName="landing-page">
          <Header />
          <Features />
          <HowTo />
          <Subscriptions />
          <Footer />
        </Grid>
      </ThemeProvider>
    )
  }
}

export default LandingPage
