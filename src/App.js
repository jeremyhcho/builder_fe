import React from 'react'
import { Switch } from 'react-router-dom'

// Global CSS
import './Assets/Stylesheets/Main.scss'

// Layouts
import MainLayout from 'Layouts/Main'
import AuthLayout from 'Layouts/Auth'

// Components
import AuthorizedRoute from 'Components/AuthorizedRoute'
import UnauthorizedRoute from 'Components/UnauthorizedRoute'

// const PrimaryLayout = Loadable({
//   loader: () => import('./layouts/Primary'),
//   loading: Loader
// })
//
// const SessionLayout = Loadable({
//   loader: () => import('./layouts/Session'),
//   loading: Loader
// })

// componentWillMount () {
//   const { authorizeSession, unauthorizeSession } = this.props
//   const cookies = new Cookies()
//
//   if (cookies.get('authorized')) {
//     return authorizeSession()
//   }
//
//   return unauthorizeSession()
// }

class App extends React.Component {
  render () {
    return (
      <div className='main'>
        <Switch>
          <UnauthorizedRoute path='/auth' component={AuthLayout} />
          <AuthorizedRoute path='/' component={MainLayout} />
        </Switch>
      </div>
    )
  }
}
export default App
