import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'
import moment from 'moment'

// Components
import { Card, Spinner } from 'Components/Common'

// Actions
import { fetchNBATeamSchedule } from 'Actions'

// Helpers
import { makeGroupedSchedule } from 'Helpers/Selectors'

// CSS
import './Schedule.scss'

class Schedule extends React.Component {
  componentDidMount () {
    this.props.fetchNBATeamSchedule(this.props.match.params.id)
  }

  getYear (schedule) {
    const months = Object.keys(schedule)
    const firstGameYear = moment(new Date(schedule[months[0]][0].date)).format('YYYY')
    const lastGameYear = moment(new Date(schedule[months[months.length - 1]][0].date)).format('YYYY')
    return firstGameYear === lastGameYear ?
      firstGameYear :
      `${firstGameYear}-${lastGameYear}`
  }

  getMatchType (game) {
    if (game.match_type === 'HOME') {
      return 'vs'
    }

    return '@'
  }

  getResult (game) {
    if (game.points) {
      return game.points > game.opponent.points ? (
        <p>
          <span style={{ color: 'var(--green)' }} className="semibold">W</span>
          {' '}{game.points}-{game.opponent.points}
        </p>
      ) : (
        <p>
          <span style={{ color: 'var(--red)' }} className="semibold">L</span>
          {' '}{game.points}-{game.opponent.points}
        </p>
      )
    }

    return '-'
  }

  navigateToGame = (game) => {
    this.props.history.push(`/games/${game.match_id}`)
  }

  render () {
    const { schedule, teamDetails } = this.props

    if (!Object.keys(schedule).length || !Object.keys(teamDetails).length) {
      return (
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Spinner lg show />
        </div>
      )
    }

    return (
      <Card
        styleName="schedule"
        label={`${teamDetails.full_name} Schedule ${this.getYear(schedule)}`}
        wrapperStyle={{
          padding: '35px',
          marginBottom: '65px',
          width: '950px',
          maxWidth: '1300px'
        }}
      >
        {
          Object.keys(schedule).map(month => (
            <div key={month}>
              <Row styleName="header">
                <div>
                  <h4 className="semibold">
                    {month}, {moment(new Date(schedule[month][0].date)).format('YYYY')}
                  </h4>
                  <p className="label">
                    {schedule[month].length} Games
                  </p>
                </div>
              </Row>

              <div styleName="schedule-month">
                <Row styleName="row label">
                  <Col xs={3}>
                    <p className="semibold label">DATE</p>
                  </Col>

                  <Col xs={4}>
                    <p className="semibold label">OPPONENT</p>
                  </Col>

                  <Col xs={3}>
                    <p className="semibold label">RESULT</p>
                  </Col>

                  <Col xs={2}>
                    <p className="semibold label">TIME</p>
                  </Col>
                </Row>

                {
                  schedule[month].map(game => (
                    <Row
                      key={game.date}
                      styleName="row values"
                      onClick={() => this.navigateToGame(game)}
                    >
                      <Col xs={3}>
                        <p>{moment(new Date(game.date)).format('ddd, MMM D')}</p>
                      </Col>

                      <Col xs={4}>
                        <p>
                          {this.getMatchType(game)} {game.opponent.city} {game.opponent.name}
                        </p>
                      </Col>

                      <Col xs={3}>
                        {this.getResult(game)}
                      </Col>

                      <Col xs={2}>
                        <p>{moment(new Date(game.date)).format('h:mm a')}</p>
                      </Col>
                    </Row>
                  ))
                }
              </div>
            </div>
          ))
        }
      </Card>
    )
  }
}

Schedule.defaultProps = {
  schedule: {},
  teamDetails: {}
}

Schedule.propTypes = {
  fetchNBATeamSchedule: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  schedule: PropTypes.object,
  teamDetails: PropTypes.object,
  history: PropTypes.object.isRequired
}

const makeMapStateToProps = () => {
  const getSchedule = makeGroupedSchedule()
  return ({ routines }) => ({
    schedule: getSchedule(routines),
    teamDetails: routines.nba.teamDetails
  })
}

const mapDispatchToProps = {
  fetchNBATeamSchedule
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Schedule)
