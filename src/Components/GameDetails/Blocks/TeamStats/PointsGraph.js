import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row } from 'react-styled-flexboxgrid'
import { Line } from 'react-chartjs-2'

// Components
import { Select, Card } from 'Components/Common'

// CSS
import './TeamStats.scss'

// Actions
import { fetchNBATeamStats } from 'Actions'

// Helpers
import { colorComparator } from 'Helpers'

class PointsGraph extends React.Component {
  state = {
    selectedOption1: '',
    selectedOption2: ''
  }

  componentDidMount() {
    const { fetchNBATeamStats, idProp } = this.props
    fetchNBATeamStats(idProp)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.summary && newProps.teamStats) {
      const teamOptions = this.teamOptions(newProps.summary)

      this.setState({
        selectedOption1: teamOptions[0].value,
        selectedOption2: teamOptions[1].value
      })
    }
  }

  changeGraphOption = (key) => {
    return (e, option) => this.setState({ [key]: option.value })
  }

  determineColors () {
    const { summary } = this.props
    const homeColor = summary.home.colors.primary.slice(1)
    const awayColor = summary.away.colors.primary.slice(1)
    const secondaryAwayColor = summary.away.colors.secondary.slice(1)

    const ratio1 = colorComparator(homeColor, awayColor)
    const ratio2 = colorComparator(homeColor, secondaryAwayColor)

    const finalAwayColor = ratio1 > ratio2 ? secondaryAwayColor : awayColor

    return ({
      awayColor: `#${finalAwayColor}`,
      homeColor: `#${homeColor}`
    })
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

      const colors = this.determineColors()

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
        cubicInterpolationMode: 'linear',
        backgroundColor: colors.awayColor,
        borderColor: colors.awayColor,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'bevel',
        pointBorderColor: colors.awayColor,
        pointBackgroundColor: colors.awayColor,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.awayColor,
        // pointHoverBorderColor: summary.away.colors.secondary,
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 15,
        data: teamPoints.away.points
      }
      const awayAvgPoints = {
        label: `${summary.away.name} Average Points`,
        fill: false,
        lineTension: 0.1,
        cubicInterpolationMode: 'linear',
        backgroundColor: 'transparent',
        borderColor: colors.awayColor,
        borderCapStyle: 'butt',
        borderDash: [5, 5],
        borderDashOffset: 0.0,
        borderJoinStyle: 'bevel',
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'transparent',
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBackgroundColor: colors.awayColor,
        // pointHoverBorderColor: summary.away.colors.secondary,
        pointHoverBorderWidth: 0,
        pointRadius: 1,
        pointHitRadius: 15,
        data: teamPoints.away.avg_points
      }

      const homePoints = {
        label: `${summary.home.name} Points`,
        fill: false,
        lineTension: 0.1,
        cubicInterpolationMode: 'linear',
        backgroundColor: colors.homeColor,
        borderColor: colors.homeColor,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'bevel',
        pointBorderColor: colors.homeColor,
        // pointBackgroundColor: summary.home.colors.secondary,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.homeColor,
        // pointHoverBorderColor: summary.home.colors.secondary,
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 15,
        data: teamPoints.home.points
      }
      const homeAvgPoints = {
        label: `${summary.home.name} Average Points`,
        fill: false,
        lineTension: 0.1,
        cubicInterpolationMode: 'linear',
        backgroundColor: 'transparent',
        borderColor: colors.homeColor,
        borderCapStyle: 'butt',
        borderDash: [5, 5],
        borderDashOffset: 0.0,
        borderJoinStyle: 'bevel',
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'transparent',
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBackgroundColor: colors.homeColor,
        // pointHoverBorderColor: summary.home.colors.secondary,
        pointHoverBorderWidth: 0,
        pointRadius: 1,
        pointHitRadius: 15,
        data: teamPoints.home.avg_points
      }
      const pointsDatasets = { awayPoints, awayAvgPoints, homePoints, homeAvgPoints }
      const { selectedOption1, selectedOption2 } = this.state
      if (selectedOption1) datasets.push(pointsDatasets[selectedOption1])
      if (selectedOption2) datasets.push(pointsDatasets[selectedOption2])
    }
    return { labels, datasets }
  }

  teamOptions (summary) {
    const updatedSummary = summary || this.props.summary

    if (!updatedSummary) { return {} }

    return ([
      { label: `${updatedSummary.away.name} Points (Away)`, value: 'awayPoints' },
      { label: `${updatedSummary.away.name} Average Points (Away)`, value: 'awayAvgPoints' },
      { label: `${updatedSummary.home.name} Points (Home)`, value: 'homePoints' },
      { label: `${updatedSummary.home.name} Average Points (Home)`, value: 'homeAvgPoints' }
    ])
  }

  render () {
    const { teamStats, summary } = this.props

    if (teamStats && summary) {
      return (
        <Card label='Points by quarter'>
          <div styleName="points-graph">
            <Row center='xs'>
              <div style={{ width: '220px', margin: '10px 50px' }}>
                <Select
                  defaultText="Line 1"
                  options={this.teamOptions()}
                  onChange={this.changeGraphOption('selectedOption1')}
                  selectedVal={this.state.selectedOption1}
                />
              </div>

              <span
                className='semibold'
                style={{ lineHeight: '60px', verticalAlign: 'middle' }}
              >
                vs.
              </span>

              <div style={{ width: '220px', margin: '10px 50px' }}>
                <Select
                  defaultText="Line 2"
                  options={this.teamOptions()}
                  onChange={this.changeGraphOption('selectedOption2')}
                  selectedVal={this.state.selectedOption2}
                />
              </div>
            </Row>

            <Row center='xs'>
              <div style={{ width: '800px', marginTop: '15px' }}>
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
        </Card>
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
