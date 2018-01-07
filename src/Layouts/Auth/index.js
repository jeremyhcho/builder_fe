import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Row, Col } from 'react-styled-flexboxgrid'
// import Loadable from 'react-loadable'

// CSS
import './Auth.scss'

// Components
import { Login, Signup, Forgot, Reset } from 'Components/Auth'

// Icons
import AnalyticsIcon from 'Assets/Icons/auth/analytics-89.svg'

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
    <Row styleName='auth-card'>
      <Row middle='xs' styleName='branding-logo'>
        <h4 className="bold">Quartz</h4>
        <AnalyticsIcon style={{ marginLeft: '5px', width: '17px', height: '17px' }} />
      </Row>

      <Col xs={6} style={{ padding: '85px 75px 0', overflow: 'hidden' }}>
        <Switch>
          <Route exact path='/auth/login' component={Login} />
          <Route exact path='/auth/signup' component={Signup} />
          <Route exact path='/auth/forgot' component={Forgot} />
          <Route exact path='/auth/reset' component={Reset} />
        </Switch>
      </Col>
      <Col
        xs={6}
        style={{
          backgroundColor: 'var(--lightest-gray)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
    </Row>
  </div>
)

export default AuthLayout
