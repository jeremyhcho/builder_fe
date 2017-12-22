import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'

// Components
// import { Selects } from 'Components/Common'

// CSS
import './TeamStats.scss'

// Actions
import { fetchNBATeamStats } from 'Actions'

class TeamStats extends React.Component {
  state = {
    teamSelected: 'away'
  }

  componentDidMount() {
    const { fetchNBATeamStats, match } = this.props
    fetchNBATeamStats(match.params.id)
  }

  teamStatsData () {
    const labels = ['Q1', 'Q2', 'Q3', 'Q4']
    const datasets = [
      {
        label: 'Dataset 1',
        fill: false,
        lineTension: 0.1,
        cubicInterpolationMode: 'monotone',
        backgroundColor: 'blue',
        borderColor: 'hot-pink',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'blue',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'black',
        pointHoverBorderColor: 'black',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [1, 24, 12, 17, 31]
      },
      {
        label: 'Dataset 2',
        fill: false,
        lineTension: 0.1,
        cubicInterpolationMode: 'monotone',
        backgroundColor: 'red',
        borderColor: 'hot-pink',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'red',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'black',
        pointHoverBorderColor: 'black',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [21, 34, 22, 4, 19]
      }
    ]
    return { labels, datasets }
  }

  render () {
    const { teamStats } = this.props
    if (teamStats) {
      return (
        <div>
          <Line
            data={this.teamStatsData()}
          />
        </div>
      )
    }
    return (
      <div>
        SPINNER SPINNER TEAM STATS SPINNER SPINNER
      </div>
    )
  }
}

TeamStats.defaultProps = {
  teamStats: {}
}

TeamStats.propTypes = {
  teamStats: PropTypes.object,
  match: PropTypes.object.isRequired,
  fetchNBATeamStats: PropTypes.func.isRequired
}

const mapStateToProps = ({ matchDetails }) => ({
  teamStats: matchDetails.teamStats
})

const mapDispatchToProps = {
  fetchNBATeamStats
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamStats)
