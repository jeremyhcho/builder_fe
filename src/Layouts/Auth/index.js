import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Row, Col } from 'react-styled-flexboxgrid'
// import Loadable from 'react-loadable'

// CSS
import './Auth.scss'

// Components
import { Login, Signup, Forgot, Reset, Verify } from 'Components/Auth'

// Icons
import PlaceholderIcon from 'Assets/Icons/blue-q-1.svg'
import RocketVector from 'Assets/Icons/rocket-vector.svg'

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
      <Col
        xs={12}
        sm={6}
        styleName="auth-form"
      >
        <div styleName='branding-logo'>
          <PlaceholderIcon style={{ width: '40px', height: '40px' }} />
        </div>

        <Switch>
          <Route exact path='/auth/login' component={Login} />
          <Route exact path='/auth/signup' component={Signup} />
          <Route exact path='/auth/forgot' component={Forgot} />
          <Route exact path='/auth/reset' component={Reset} />
          <Route exact path='/auth/verify' component={Verify} />
        </Switch>
      </Col>

      <Col
        xs={6}
        styleName="creative"
      >
        <div styleName='content'>
          <h1 className='semibold'>
            Reach new heights
          </h1>

          <p className='small'>
            with actionable insights from Quze analytics
          </p>

          <RocketVector
            style={{
              width: '100%',
              height: '100%',
              margin: '0 auto',
              display: 'block',
              backgroundColor: 'var(--navy-blue)'
            }}
          />
        </div>
      </Col>
    </Row>
  </div>
)

export default AuthLayout
