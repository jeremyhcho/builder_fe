import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import Page, { Grid, GridColumn } from '@atlaskit/page'
import { Row, Col } from 'react-styled-flexboxgrid'
// import Loadable from 'react-loadable'

// Components
// import Loader from 'Components/Common/Loader'
import Header from './Header'
import SideNav from './SideNav'
import Dashboard from 'Components/Dashboard'
import GamesLayout from './Games'
import TeamsLayout from './Team'

// const CalendarContainer = Loadable({
//   loader: () => import('../../containers/Calendar'),
//   loading: Loader
// })
//
// const DashboardContainer = Loadable({
//   loader: () => import('../../containers/Dashboard'),
//   loading: Loader
// })

const layoutStyle = {
  height: '100%',
  width: '100%',
  backgroundColor: 'var(--lightest-gray)',
  margin: '0px'
}

const MainLayout = () => (
  <main style={{ display: 'flex', overflow: 'hidden' }}>
    <SideNav />

    <div style={{ width: '100%', height: '100vh', minWidth: '964px' }}>
      <Header />
      <Row style={layoutStyle}>
        <Col xs={12} style={{ marginTop: '20px' }}>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/games' component={GamesLayout} />
            <Route path='/teams' component={TeamsLayout} />
          </Switch>
        </Col>
      </Row>
    </div>
  </main>
)

export default MainLayout
