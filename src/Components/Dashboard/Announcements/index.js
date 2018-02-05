import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Grid
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Card } from 'Components/Common'
import AnnouncementItem from './AnnouncementItem'

// Actions
import { fetchDashboardAnnouncements } from 'Actions'

// CSS
import './Announcements.scss'

class Announcements extends React.Component {
  componentDidMount () {
    this.props.fetchDashboardAnnouncements()
  }

  render () {
    return (
      <Card
        label='Announcements'
        style={{ width: '100%', marginTop: 0 }}
        wrapperStyle={{
          padding: '45px 30px',
          overflowY: 'auto',
          height: '500px'
        }}
      >
        <Row styleName='announcements'>
          <Col xs={12}>
            {
              this.props.announcements.map(announcement => (
                <AnnouncementItem announcement={announcement} key={announcement.id} />
              ))
            }
          </Col>
        </Row>
      </Card>
    )
  }
}

Announcements.defaultProps = {
  announcements: []
}

Announcements.propTypes = {
  fetchDashboardAnnouncements: PropTypes.func.isRequired,
  announcements: PropTypes.array
}

const mapStateToProps = ({ routines }) => ({
  announcements: routines.dashboard.fetchDashboardAnnouncements
})

const mapDispatchToProps = {
  fetchDashboardAnnouncements
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Announcements)
