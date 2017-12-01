import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import Loadable from 'react-loadable'

// CSS
import './Auth.scss'

// Components
// import Loader from 'Components/Common/Loader'
// import SideDiv from './SideDiv'
import Login from 'Components/Login'
import SignupPage from 'Components/User/SignupPage'

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
        <Route exact path='/auth/signup' component={SignupPage} />
        {/* <Route exact path='/auth/forgot' component={ForgotContainer} />
        <Route exact path='/auth/reset' component={ResetContainer} /> */}
      </Switch>
    </div>
  </div>
)

export default Session
