import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'
import { Line } from 'react-chartjs-2'

// Components
import { Select, Card, Spinner } from 'Components/Common'
import MatchupGraphInfo from './MatchupGraphInfo'

// CSS
import './Matchup.scss'

// Actions
import { fetchNBATeamMatchStats } from 'Actions'

// Helpers
import { colorComparator } from 'Helpers'
import options from './options'

class MatchupGraph extends React.Component {
  state = {
    selectedOption1: '',
    selectedOption2: ''
  }

  componentDidMount() {
    const { fetchNBATeamMatchStats, matchup } = this.props
    if (matchup) {
      fetchNBATeamMatchStats(matchup.id)
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.matchup.id && !this.props.matchup
      || newProps.matchup.id !== this.props.matchup.id) {
      this.props.fetchNBATeamMatchStats(newProps.matchup.id)
    }

    if (newProps.matchup && newProps.teamMatchStats) {
      const teamOptions = this.teamOptions(newProps.matchup)

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
    const { matchup } = this.props
    const homeColor = matchup.home.colors.primary.slice(1)
    const awayColor = matchup.away.colors.primary.slice(1)
    const secondaryAwayColor = matchup.away.colors.secondary.slice(1)

    const ratio1 = colorComparator(homeColor, awayColor)
    const ratio2 = colorComparator(homeColor, secondaryAwayColor)

    const finalAwayColor = ratio1 > ratio2 ? secondaryAwayColor : awayColor

    return ({
      awayColor: `#${finalAwayColor}`,
      homeColor: `#${homeColor}`
    })
  }

  teamMatchStatsData () {
    const { teamMatchStats, matchup } = this.props
    const labels = ['Q1', 'Q2', 'Q3', 'Q4']
    const datasets = []
    if (teamMatchStats && matchup) {
      const teamPoints = {
        away: { points: [], avg_points: [] },
        home: { points: [], avg_points: [] }
      }

      const colors = this.determineColors()

      Object.keys(teamMatchStats.away).forEach(quarter => {
        teamPoints.away.points.push(teamMatchStats.away[quarter].points)
        teamPoints.away.avg_points.push(teamMatchStats.away[quarter].avg_points)
        teamPoints.home.points.push(teamMatchStats.home[quarter].points)
        teamPoints.home.avg_points.push(teamMatchStats.home[quarter].avg_points)
      })

      const awayPoints = {
        label: `${matchup.away.name} Points`,
        fill: false,
        lineTension: 0.1,
        cubicInterpolationMode: 'linear',
        backgroundColor: colors.awayColor,
        borderColor: colors.awayColor,
        pointBorderColor: colors.awayColor,
        pointBackgroundColor: colors.awayColor,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.awayColor,
        pointRadius: 4,
        data: teamPoints.away.points
      }
      const awayAvgPoints = {
        label: `${matchup.away.name} Average Points`,
        fill: false,
        lineTension: 0.1,
        cubicInterpolationMode: 'linear',
        backgroundColor: 'transparent',
        borderColor: colors.awayColor,
        borderDash: [5, 5],
        borderDashOffset: 0.0,
        pointHoverBackgroundColor: colors.awayColor,
        pointRadius: 0,
        data: teamPoints.away.avg_points
      }

      const homePoints = {
        label: `${matchup.home.name} Points`,
        fill: false,
        lineTension: 0.1,
        cubicInterpolationMode: 'linear',
        backgroundColor: colors.homeColor,
        borderColor: colors.homeColor,
        pointBorderColor: colors.homeColor,
        pointBackgroundColor: colors.homeColor,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.homeColor,
        pointRadius: 4,
        data: teamPoints.home.points
      }
      const homeAvgPoints = {
        label: `${matchup.home.name} Average Points`,
        fill: false,
        lineTension: 0.1,
        cubicInterpolationMode: 'linear',
        backgroundColor: 'transparent',
        borderColor: colors.homeColor,
        borderDash: [5, 5],
        borderDashOffset: 0.0,
        pointHoverBackgroundColor: colors.homeColor,
        pointRadius: 0,
        data: teamPoints.home.avg_points
      }
      const pointsDatasets = { awayPoints, awayAvgPoints, homePoints, homeAvgPoints }
      const { selectedOption1, selectedOption2 } = this.state
      if (selectedOption1) datasets.push(pointsDatasets[selectedOption1])
      if (selectedOption2) datasets.push(pointsDatasets[selectedOption2])
    }
    return { labels, datasets }
  }

  teamOptions (matchup) {
    const updatedSummary = matchup || this.props.matchup

    if (!updatedSummary) { return {} }

    return ([
      { label: `${updatedSummary.away.name} Points (Away)`, value: 'awayPoints' },
      { label: `${updatedSummary.away.name} Average Points (Away)`, value: 'awayAvgPoints' },
      { label: `${updatedSummary.home.name} Points (Home)`, value: 'homePoints' },
      { label: `${updatedSummary.home.name} Average Points (Home)`, value: 'homeAvgPoints' }
    ])
  }

  render () {
    const { teamMatchStats, matchup, fetchingTeamStats } = this.props

    if (teamMatchStats && matchup && !fetchingTeamStats) {
      return (
        <Card label='Points by quarter' subText={<MatchupGraphInfo />}>
          <div styleName="points-graph">
            <Row center='xs'>
              <div style={{ width: '220px', margin: '10px 30px' }}>
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

              <div style={{ width: '220px', margin: '10px 30px' }}>
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
                  width={600}
                  height={300}
                  data={this.teamMatchStatsData()}
                  options={options}
                />
              </div>
            </Row>
          </div>
        </Card>
      )
    }
    return (
      <Card label="Points by quarter" subText={<MatchupGraphInfo />}>
        <Row center='xs' middle='xs' style={{ height: '567px' }}>
          <Col xs={12}>
            <Spinner lg show />
          </Col>
        </Row>
      </Card>
    )
  }
}

MatchupGraph.defaultProps = {
  teamMatchStats: null,
  matchup: null,
  fetchingTeamStats: false
}

MatchupGraph.propTypes = {
  teamMatchStats: PropTypes.object,
  matchup: PropTypes.object,
  fetchNBATeamMatchStats: PropTypes.func.isRequired,
  fetchingTeamStats: PropTypes.bool
}

const mapStateToProps = ({ routines }) => ({
  teamMatchStats: routines.nba.teamMatchStats,
  matchup: routines.nba.matchup,
  fetchingTeamStats: routines.isLoading.FETCH_NBA_TEAM_MATCH_STATS
})

const mapDispatchToProps = {
  fetchNBATeamMatchStats
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchupGraph)
