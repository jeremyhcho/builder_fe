/* eslint no-undef: 0 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { setPusherClient } from 'Components/Pusher'
import { StripeProvider } from 'react-stripe-elements'
import Pusher from 'pusher-js'

// Global CSS
import './Assets/Stylesheets/Main.scss'

// Router
import AppRouter from './Router'

// Store
import store from 'Config/Store'

const rootEl = document.getElementById('root')

const pusherClient = new Pusher(process.env.PUSHER_KEY, {
  cluster: 'us2'
})

setPusherClient(pusherClient)

ReactDOM.render(
  <AppContainer warnings={false}>
    <Provider store={store}>
      <StripeProvider apiKey={process.env.STRIPE_KEY}>
        <AppRouter />
      </StripeProvider>
    </Provider>
  </AppContainer>,
  rootEl
)

if (module.hot) {
  module.hot.accept('./Router', () => {
    const NextApp = require('./Router').default

    ReactDOM.render(
      <AppContainer warnings={false}>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>
    )
  })
}
