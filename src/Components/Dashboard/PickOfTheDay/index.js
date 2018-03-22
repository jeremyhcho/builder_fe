import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

// Components
import { Card } from 'Components/Common'

// Actions
import { fetchDashboardPotd } from 'Actions'

// CSS
import './Potd.scss'

class PickOfTheDay extends React.Component {
  componentDidMount () {
    this.props.fetchDashboardPotd()
  }

  render () {
    /* eslint-disable react/no-danger */
    return (
      <Card label='Pick of the Day' style={{ margin: 0 }} wrapperStyle={{ padding: '40px' }}>
        <p className='label small'>
          {moment(this.props.potd.published_date).tz('America/Los_Angeles').format('dddd, MMMM Do')}
        </p>

        <h3 className='semibold' style={{ marginTop: '8px' }}>{this.props.potd.title}</h3>

        <div
          styleName='potd'
          style={{ marginTop: '30px' }}
          dangerouslySetInnerHTML={{ __html: this.props.potd.body }}
        />
      </Card>
    )
    /* eslint-enable react/no-danger */
  }
}

PickOfTheDay.defaultProps = {
  potd: []
}

PickOfTheDay.propTypes = {
  potd: PropTypes.array,
  fetchDashboardPotd: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  potd: routines.dashboard.potd
})

const mapDispatchToProps = {
  fetchDashboardPotd
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickOfTheDay)
