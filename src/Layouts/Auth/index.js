import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Row, Col } from 'react-styled-flexboxgrid'
// import Loadable from 'react-loadable'

// CSS
import './Auth.scss'

// Components
import { Login, Signup, Forgot, Reset, Verify } from 'Components/Auth'

// Icons
import AnalyticsIcon from 'Assets/Icons/auth/analytics-89.svg'
import PodiumIcon from 'Assets/Icons/auth/podium.svg'

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

      <Col
        xs={6}
        style={{
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#fff',
          borderTopLeftRadius: '3px',
          borderBottomLeftRadius: '3px'
        }}
      >
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
        style={{
          backgroundColor: 'var(--navy-blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTopRightRadius: '3px',
          borderBottomRightRadius: '3px',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '85%'
          }}
        >
          <h1
            className='semibold'
            style={{
              textAlign: 'center',
              color: '#fff',
              marginBottom: '5px'
            }}
          >
            Reach new heights
          </h1>

          <p
            className='small'
            style={{
              color: '#fff',
              textAlign: 'center',
              marginBottom: '40px'
            }}
          >
            with actionable insights from Quartz analytics
          </p>

          <PodiumIcon
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
