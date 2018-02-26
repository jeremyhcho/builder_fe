import React from 'react'
import { Helmet } from 'react-helmet'

// Components
import Header from './Header'
import Features from './Features'
import HowTo from './HowTo'
import Closer from './Closer'
import Footer from './Footer'

// CSS
import './LandingPage.scss'

// Helpers
// import LandingPageTheme from './LandingPageTheme'

const LandingPage = () => {
  return (
    <div styleName="landing-page">
      <Helmet>
        <style type='text/css'>
          {`
            #Smallchat { display: block !important; }
          `}
        </style>
      </Helmet>

      <Header />
      <Features />
      <HowTo />
      <Closer />
      <Footer />
    </div>
  )
}

export default LandingPage
