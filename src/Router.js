/* eslint react/prefer-stateless-function: 0 */
import React from 'react'
import { ConnectedRouter } from 'react-router-redux'
import history from './History'
import DevTools from 'Config/DevTools'

// Components
import App from './App'

const production = process.env.NODE_ENV === 'production'

const AppRouter = () => (
  <ConnectedRouter history={history}>
    <div>
      <App />
      {!production && <DevTools />}
    </div>
  </ConnectedRouter>
)

export default AppRouter
