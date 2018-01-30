import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

// Components
import { Select } from 'Components/Common'

// Actions
import { fetchNBAPreviousMeetings, fetchNBAMatchup } from 'Actions'

class MatchupSelector extends React.Component {
  componentDidMount () {
    if (!Object.keys(this.props.previousMeetings).length) {
      this.props.fetchNBAPreviousMeetings(this.props.summary.id)
    }
  }

  findMatchType (matchup) {
    if (matchup.away.match_type === 'AWAY') {
      return matchup.away.short_name
    }

    return matchup.home.short_name
  }

  render () {
    const { previousMeetings, fetchNBAMatchup } = this.props

    if (!previousMeetings.length) {
      return <div />
    }

    const options = previousMeetings.map(matchup => ({
      label: `${moment(new Date(matchup.date)).format('MM/DD/YYYY')} @ ${this.findMatchType(matchup)}`,
      value: matchup.id
    }))

    return (
      <div>
        <Select
          style={{ backgroundColor: '#fff' }}
          defaultText="Select Matchup"
          wrapperStyle={{ marginTop: '15px' }}
          options={options}
          onChange={(e, option) => fetchNBAMatchup(option.value)}
          selectedVal={this.props.matchup.id}
        />
      </div>
    )
  }
}

MatchupSelector.defaultProps = {
  summary: {},
  previousMeetings: [],
  matchup: {}
}

MatchupSelector.propTypes = {
  summary: PropTypes.object,
  previousMeetings: PropTypes.array,
  matchup: PropTypes.object,
  fetchNBAPreviousMeetings: PropTypes.func.isRequired,
  fetchNBAMatchup: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  summary: routines.nba.summary,
  matchup: routines.nba.matchup,
  previousMeetings: routines.nba.previousMeetings
})

const mapDispatchToProps = {
  fetchNBAPreviousMeetings,
  fetchNBAMatchup
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchupSelector)
