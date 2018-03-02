import React from 'react'

// Components
import Loader from '../Loader'

// CSS
import './TimedOutLoader.scss'

const TimedOutLoader = () => (
  <div styleName="loading-page">
    <div styleName="loader delayed">
      <Loader />

      <p>Try refreshing the page</p>
    </div>
  </div>
)

export default TimedOutLoader
