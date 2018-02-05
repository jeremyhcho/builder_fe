import React from 'react'

// Grid
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { DocumentTitle } from 'Components/Common'
import Announcements from './Announcements'
import RecentPredictions from './RecentPredictions'
import PickOfTheDay from './PickOfTheDay'

// CSS
import './Dashboard.scss'

class Dashboard extends React.Component {
  render () {
    return (
      <DocumentTitle title='Quartz - Dashboard' header='Dashboard'>
        <div styleName='dashboard'>
          <Row style={{ maxWidth: '1300px' }}>
            <Col xs={12}>
              <PickOfTheDay />
            </Col>
          </Row>

          <Row style={{ maxWidth: '1300px', marginTop: '35px' }}>
            <Col xs={6}>
              <Announcements />
            </Col>

            <Col xs={6}>
              <p className='semibold' style={{ marginBottom: '5px', marginLeft: '15px' }}>
                Yesterday's Predictions
              </p>

              <RecentPredictions />
            </Col>
          </Row>
        </div>
      </DocumentTitle>
    )
  }
}

export default Dashboard
