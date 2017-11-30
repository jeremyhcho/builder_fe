import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import SignupPage from 'Components/User/SignupPage'

// Global CSS
import './Assets/Stylesheets/Main.scss'

const App = () => (
  <BrowserRouter>
    <main>
      <Switch>
        <Route exact path="/signup" component={SignupPage} />
        <Redirect to="/signup" />
      </Switch>
    </main>
  </BrowserRouter>
)

export default App
