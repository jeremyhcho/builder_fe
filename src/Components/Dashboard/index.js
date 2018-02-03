import React from 'react'

// Components
import { DocumentTitle } from 'Components/Common'

// CSS
import './Dashboard.scss'

class Dashboard extends React.Component {
  render () {
    return (
      <DocumentTitle title='Quartz - Dashboard' header='Dashboard'>
        <div className='dashboard' />
      </DocumentTitle>
    )
  }
}

export default Dashboard
