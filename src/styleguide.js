/* eslint no-undef: 0 */
import React from 'react'
import ReactDOM from 'react-dom'

// HMR
import { AppContainer } from 'react-hot-loader'

// Components
import Styleguide from 'Components/Styleguide'

// Global CSS
import './Assets/Stylesheets/Main.scss'

const rootEl = document.getElementById('root')

ReactDOM.render(
  <AppContainer>
    <Styleguide />
  </AppContainer>,
  rootEl
)

if (module.hot) {
  module.hot.accept('./Router', () => {
    const NextApp = require('./Components/Styleguide').default

    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>
    )
  })
}
