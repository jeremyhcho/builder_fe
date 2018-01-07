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
import { receivePusherNotification } from 'Actions'

const MainLayout = ({ userId, receivePusherNotification }) => (
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

MainLayout.defaultProps = {
  userId: 0
}

MainLayout.propTypes = {
  userId: PropTypes.number,
  receivePusherNotification: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.authState.user.id
})

const mapDispatchToProps = {
  receivePusherNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayout)
