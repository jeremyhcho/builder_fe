import React from 'react'

// Components
import Loader from '../Loader'

// CSS
import './DelayedLoader.scss'

const DelayedLoader = () => (
  <div styleName="loading-page">
    <div styleName="loader delayed">
      <Loader />
    </div>
  </div>
)

export default DelayedLoader
