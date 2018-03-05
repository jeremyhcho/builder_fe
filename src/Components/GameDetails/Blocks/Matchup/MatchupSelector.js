import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

// Components
import { Select } from 'Components/Common'

// Actions
import { fetchNBAPreviousMeetings, fetchNBAMatchup } from 'Actions'

// CSS
import './Matchup.scss'

class MatchupSelector extends React.Component {
  componentDidMount () {
    if (!this.props.previousMeetings) {
      this.props.fetchNBAPreviousMeetings(this.props.summary.id)
    }
  }

  render () {
    const { previousMeetings, fetchNBAMatchup, summary } = this.props

    if (!previousMeetings || !Object.keys(summary).length) {
      return <div />
    }

    const options = previousMeetings.map(matchup => ({
      label: `${moment(new Date(matchup.date)).format('MM/DD/YYYY')} @ ${matchup.home.short_name}`,
      value: matchup.id
    }))

    return (
      <div styleName="matchup-selector">
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
  previousMeetings: null,
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
