import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import Page, { Grid, GridColumn } from '@atlaskit/page'
import { Row, Col } from 'react-styled-flexboxgrid'
// import Loadable from 'react-loadable'

// Components
// import Loader from 'Components/Common/Loader'
import SideNav from 'Components/SideNav'
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
  <Row>
    <Col>
      <SideNav />
    </Col>

    <Col lg>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/matches' component={Matches} />
      </Switch>
    </Col>
  </Row>
)

export default MainLayout
