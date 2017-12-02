import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import Loadable from 'react-loadable'

// CSS
import './Auth.scss'

// Components
// import Loader from 'Components/Common/Loader'
// import SideDiv from './SideDiv'
import { Login, Signup, Forgot, Reset } from 'Components/Auth'

// const LoginContainer = Loadable({
//   loader: () => import('../../containers/Session/Login'),
//   loading: Loader
// })
//
// const SignupContainer = Loadable({
//   loader: () => import('../../containers/Session/Signup'),
//   loading: Loader
// })
//
// const ForgotContainer = Loadable({
//   loader: () => import('../../containers/Session/Forgot'),
//   loading: Loader
// })
//
// const ResetContainer = Loadable({
//   loader: () => import('../../containers/Session/Reset'),
//   loading: Loader
// })

const AuthLayout = () => (
  <div styleName='auth-wrapper'>
    <div style={{ height: '48px' }} />

    <h1
      style={{
        fontSize: '36px',
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
      }}
    >
      QUARTZ
    </h1>

    <Switch>
      <Route exact path='/auth/login' component={Login} />
      <Route exact path='/auth/signup' component={Signup} />
      <Route exact path='/auth/forgot' component={Forgot} />
      <Route exact path='/auth/reset' component={Reset} />
    </Switch>
  </div>
)

export default AuthLayout
