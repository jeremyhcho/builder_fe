import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import Loadable from 'react-loadable'

// CSS
import './Auth.scss'

// Components
// import Loader from 'Components/Common/Loader'
// import SideDiv from './SideDiv'
import { Login, Signup, Forgot } from 'Components/Auth'

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

const Session = () => (
  <div styleName='auth-wrapper'>
    {/* <SideDiv /> */}

    <div className='col' style={{ padding: 0 }}>
      <Switch>
        <Route exact path='/auth/login' component={Login} />
        <Route exact path='/auth/signup' component={Signup} />
        <Route exact path='/auth/forgot' component={Forgot} />
        {/* <Route exact path='/auth/reset' component={ResetContainer} /> */}
      </Switch>
    </div>
  </div>
)

export default Session
