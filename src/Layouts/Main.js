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
import Matches from 'Components/Matches'

// const CalendarContainer = Loadable({
//   loader: () => import('../../containers/Calendar'),
//   loading: Loader
// })
//
// const DashboardContainer = Loadable({
//   loader: () => import('../../containers/Dashboard'),
//   loading: Loader
// })

const MainLayout = () => (
  <main>
    <SideNav />
    <Header />
    <Row style={{ marginLeft: '60px' }}>
      <Col xs={12} style={{ marginTop: '20px' }}>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/matches' component={Matches} />
        </Switch>
      </Col>
    </Row>
  </main>
)

export default MainLayout
