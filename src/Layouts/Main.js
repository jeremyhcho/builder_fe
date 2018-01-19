import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import Loadable from 'react-loadable'

// Components
// import Loader from 'Components/Common/Loader'
import Header from './Header'
import SideNav from './SideNav'
import Pusher from 'Components/Pusher'
// import Dashboard from 'Components/Dashboard'
import GamesLayout from './Games'
import TeamsLayout from './Teams'
import SettingsLayout from './Settings'
import ModelsLayout from './Models'
import { Button } from 'Components/Common'

// Assets
import Lock from 'Assets/Icons/lock.svg'

// const CalendarContainer = Loadable({
//   loader: () => import('../../containers/Calendar'),
//   loading: Loader
// })
//
// const DashboardContainer = Loadable({
//   loader: () => import('../../containers/Dashboard'),
//   loading: Loader
// })

// Actions
import {
  receivePusherNotification,
  resendVerificationEmail
} from 'Actions'

const MainLayout = ({
  userId,
  isVerified,
  sendingEmail,
  receivePusherNotification,
  resendVerificationEmail
}) => {
  const sendVerificationEmail = () => resendVerificationEmail(userId)

  if (!isVerified) {
    return (
      <main>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            textAlign: 'center'
          }}
        >
          <Lock height={128} width={128} style={{ opacity: '0.2' }} />

          <h1 className='semibold' style={{ marginTop: '45px' }}>
            Uh oh, looks like you haven't verified your email yet.
          </h1>

          <div style={{ width: '200px', margin: '0 auto' }}>
            <Button
              style={{ marginTop: '45px' }}
              onClick={sendVerificationEmail}
              loading={sendingEmail}
              shouldFitContainer
            >
              Resend email verification
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{ display: 'flex', overflow: 'hidden' }}>
      <Pusher
        channel={`builder_api_${userId}`}
        event='notification_received'
        onUpdate={receivePusherNotification}
      />

      <SideNav />

      <div
        style={{
          width: '100%',
          height: '100vh',
          minWidth: '964px',
          minHeight: '700px'
        }}
      >
        <Header />
        <div style={{ overflowY: 'scroll', height: 'calc(100% - 60px)' }}>
          <Switch>
            {/* <Route exact path='/' component={Dashboard} /> */}
            <Route path='/games' component={GamesLayout} />
            <Route path='/teams' component={TeamsLayout} />
            <Route path='/models' component={ModelsLayout} />
            <Route path='/settings' component={SettingsLayout} />
            <Redirect from='/' to='/games' />
          </Switch>
        </div>
      </div>
    </main>
  )
}

MainLayout.defaultProps = {
  userId: 0,
  isVerified: false
}

MainLayout.propTypes = {
  userId: PropTypes.number,
  receivePusherNotification: PropTypes.func.isRequired,
  isVerified: PropTypes.bool.isRequired,
  resendVerificationEmail: PropTypes.func.isRequired,
  sendingEmail: PropTypes.bool.isRequired
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.authState.user.id,
  isVerified: auth.authState.user.is_verified,
  sendingEmail: auth.signup.sendingEmail
})

const mapDispatchToProps = {
  receivePusherNotification,
  resendVerificationEmail
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayout)
