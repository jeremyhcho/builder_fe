import React from 'react'

// Components
import Header from './Header'
import Features from './Features'
import HowTo from './HowTo'
import Subscriptions from './Subscriptions'
import Footer from './Footer'

// CSS
import './LandingPage.scss'

// Helpers
// import LandingPageTheme from './LandingPageTheme'

const LandingPage = () => {
  return (
    <div styleName="landing-page">
      <Header />
      <Features />
      <HowTo />
      <Subscriptions />
      <Footer />
    </div>
  )
}

export default LandingPage
