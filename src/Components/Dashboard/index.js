import React from 'react'

// Grid
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { DocumentTitle } from 'Components/Common'
import Announcements from './Announcements'

// CSS
import './Dashboard.scss'

class Dashboard extends React.Component {
  render () {
    return (
      <DocumentTitle title='Quartz - Dashboard' header='Dashboard'>
        <div styleName='dashboard'>
          <Row>
            <Col xs={6}>
              <Announcements />
            </Col>
          </Row>
        </div>
      </DocumentTitle>
    )
  }
}

export default Dashboard
