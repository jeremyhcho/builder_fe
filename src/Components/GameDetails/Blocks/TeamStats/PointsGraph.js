import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'react-styled-flexboxgrid'
import { Line } from 'react-chartjs-2'

// Components
import { Select } from 'Components/Common'

// CSS
import './TeamStats.scss'

// Actions
import { fetchNBATeamStats } from 'Actions'

class PointsGraph extends React.Component {
  state = {
    selectedOption1: '',
    selectedOption2: ''
  }

  componentDidMount() {
    const { fetchNBATeamStats, idProp } = this.props
    fetchNBATeamStats(idProp)
  }

  teamStatsData () {
    const { teamStats, summary } = this.props
    const labels = ['Q1', 'Q2', 'Q3', 'Q4']
    const datasets = []
    if (teamStats && summary) {
      const teamPoints = {
        away: { points: [], avg_points: [] },
        home: { points: [], avg_points: [] }
      }
      Object.keys(teamStats.away).forEach(quarter => {
        teamPoints.away.points.push(teamStats.away[quarter].points)
        teamPoints.away.avg_points.push(teamStats.away[quarter].avg_points)
        teamPoints.home.points.push(teamStats.home[quarter].points)
        teamPoints.home.avg_points.push(teamStats.home[quarter].avg_points)
      })

      const awayPoints = {
        label: `${summary.away.name} Points`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: summary.away.colors.primary,
        borderColor: summary.away.colors.primary,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'bevel',
        pointBorderColor: summary.away.colors.primary,
        pointBackgroundColor: summary.away.colors.secondary,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: summary.away.colors.primary,
        pointHoverBorderColor: summary.away.colors.secondary,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 15,
        data: teamPoints.away.points
      }
      const awayAvgPoints = {
        label: `${summary.away.name} Average Points`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'transparent',
        borderColor: summary.away.colors.primary,
        borderCapStyle: 'butt',
        borderDash: [5, 5],
        borderDashOffset: 0.0,
        borderJoinStyle: 'bevel',
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'transparent',
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBackgroundColor: summary.away.colors.primary,
        pointHoverBorderColor: summary.away.colors.secondary,
        pointHoverBorderWidth: 0,
        pointRadius: 1,
        pointHitRadius: 15,
        data: teamPoints.away.avg_points
      }

      const homePoints = {
        label: `${summary.home.name} Points`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: summary.home.colors.primary,
        borderColor: summary.home.colors.primary,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'bevel',
        pointBorderColor: summary.home.colors.primary,
        pointBackgroundColor: summary.home.colors.secondary,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: summary.home.colors.primary,
        pointHoverBorderColor: summary.home.colors.secondary,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 15,
        data: teamPoints.home.points
      }
      const homeAvgPoints = {
        label: `${summary.home.name} Average Points`,
        fill: false,
        lineTension: 0.1,
        cubicInterpolationMode: 'monotone',
        backgroundColor: 'transparent',
        borderColor: summary.home.colors.primary,
        borderCapStyle: 'butt',
        borderDash: [5, 5],
        borderDashOffset: 0.0,
        borderJoinStyle: 'bevel',
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'transparent',
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBackgroundColor: summary.home.colors.primary,
        pointHoverBorderColor: summary.home.colors.secondary,
        pointHoverBorderWidth: 0,
        pointRadius: 1,
        pointHitRadius: 15,
        data: teamPoints.home.avg_points
      }
      const pointsDatasets = { awayPoints, awayAvgPoints, homePoints, homeAvgPoints }
      const { selectedOption1, selectedOption2 } = this.state
      if (!selectedOption1) datasets.push(pointsDatasets.awayPoints)
      if (selectedOption1) datasets.push(pointsDatasets[selectedOption1])
      if (selectedOption2) datasets.push(pointsDatasets[selectedOption2])
    }
    return { labels, datasets }
  }

  render () {
    const { teamStats, summary } = this.props
    if (teamStats && summary) {
      const teamOptions = [
        { label: `${summary.away.name} Points (Away)`, value: 'awayPoints' },
        { label: `${summary.away.name} Average Points (Away)`, value: 'awayAvgPoints' },
        { label: `${summary.home.name} Points (Home)`, value: 'homePoints' },
        { label: `${summary.home.name} Average Points(Home)`, value: 'homeAvgPoints' }
      ]
      return (
        <div styleName="points-graph">
          <Row center='xs'>
            <div style={{ width: '220px', margin: '10px 50px' }}>
              <Select
                defaultText="Option 1"
                options={teamOptions}
                onChange={(e, option) => this.setState({ selectedOption1: option.value })}
                selectedVal={this.state.selectedOption1}
              />
            </div>
            <div style={{ width: '220px', margin: '10px 50px' }}>
              <Select
                defaultText="Option 2"
                options={teamOptions}
                onChange={(e, option) => this.setState({ selectedOption2: option.value })}
                selectedVal={this.state.selectedOption2}
              />
            </div>
          </Row>

          <Row center='xs'>
            <div style={{ width: '800px' }}>
              <Line
                width={800}
                height={400}
                data={this.teamStatsData()}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    yAxes: [{
                      ticks: {
                        stepSize: 2
                      }
                    }]
                  },
                  layout: {
                    padding: {
                      left: 40,
                      right: 40,
                      top: 0,
                      bottom: 0
                    }
                  }
                }}
              />
            </div>
          </Row>
        </div>
      )
    }
    return (
      <div>
        <Row center='xs'>
          <div style={{ width: '800px' }}>
            <Line
              width={800}
              height={400}
              data={this.teamStatsData()}
            />
          </div>
        </Row>
      </div>
    )
  }
}

PointsGraph.defaultProps = {
  teamStats: {},
  summary: {}
}

PointsGraph.propTypes = {
  teamStats: PropTypes.object,
  summary: PropTypes.object,
  fetchNBATeamStats: PropTypes.func.isRequired,
  idProp: PropTypes.string.isRequired
}

const mapStateToProps = ({ nba }) => ({
  teamStats: nba.gameDetails.teamStats.stats,
  summary: nba.gameDetails.overview.summary
})

const mapDispatchToProps = {
  fetchNBATeamStats
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PointsGraph)
