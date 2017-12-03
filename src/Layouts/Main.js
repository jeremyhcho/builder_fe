import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import Loadable from 'react-loadable'

// Components
// import Loader from 'Components/Common/Loader'
import SideNav from 'Components/SideNav'
import Dashboard from 'Components/Dashboard'

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
  <div className='grid app'>
    <SideNav />

    <div className='col' style={{ padding: 0 }}>
      <Switch>
        <Route exact path='/' component={Dashboard} />
      </Switch>
    </div>
  </div>
)

export default MainLayout
