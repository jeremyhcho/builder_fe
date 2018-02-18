import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-styled-flexboxgrid'
import { withRouter } from 'react-router'

// Components
import { Card, Tooltip } from 'Components/Common'

// CSS
import './Teams.scss'

// SVG
import RightArrow from 'Assets/Icons/right-arrow.svg'

// Helpers
import { precisionRound } from 'Helpers'

const roundTwo = precisionRound(2)
const roundOne = precisionRound(1)

class Conference extends React.Component {
  getStreakColor (streak) {
    if (streak[0] === 'W') {
      return <p style={{ color: 'var(--green)' }}>{streak}</p>
    }

    return <p style={{ color: 'var(--red)' }}>{streak}</p>
  }

  conferenceLabel () {
    const { teams } = this.props
    const firstLetter = teams[0].conference.slice(0, 1)
    const restOfLetters = teams[0].conference.slice(1).toLowerCase()
    const conferenceName = firstLetter + restOfLetters

    return `${conferenceName}ern Conference`
  }

  navigateToTeam (id) {
    return () => this.props.history.push(`/teams/${id}`)
  }

  render () {
    const { teams } = this.props

    const conferenceLabel = this.conferenceLabel()

    return (
      <Col xs={12} styleName='conference'>
        <p className='semibold'>
          {conferenceLabel}
        </p>

        <Row style={{ padding: '0 30px', cursor: 'default' }}>
          <Col xs={6} style={{ marginRight: '-15px' }} />
          <Col xs={6}>
            <Row center='xs'>
              <Col xs={3}>
                <p className='semibold small'>W - L</p>
              </Col>

              <Col xs={3}>
                <p
                  className='semibold small'
                  data-tip-for={`${conferenceLabel} PCT`}
                >
                  PCT
                </p>
                <Tooltip id={`${conferenceLabel} PCT`} pos='top'>Winning percentage</Tooltip>
              </Col>

              <Col xs={3}>
                <p
                  className='semibold small'
                  data-tip-for={`${conferenceLabel} PPG`}
                >
                  PPG
                </p>
                <Tooltip id={`${conferenceLabel} PPG`} pos='top'>Points per game</Tooltip>
              </Col>

              <Col xs={3}>
                <p
                  className='semibold small'
                  data-tip-for={`${conferenceLabel} STRK`}
                >
                  STRK
                </p>
                <Tooltip id={`${conferenceLabel} STRK`} pos='top'>Current streak</Tooltip>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            {
              teams.map((team, index) => (
                <Card key={team.id} style={{ height: 'auto', marginTop: '10px' }}>
                  <div styleName='team-item' onClick={this.navigateToTeam(team.id)}>
                    <div styleName='team-details'>
                      <p
                        className='semibold'
                        style={{
                          display: 'inline-block',
                          marginRight: '10px',
                          width: '20px'
                        }}
                      >
                        {index + 1}
                      </p>

                      <img
                        src={team.image}
                        style={{
                          width: '20px',
                          height: '20px',
                          marginRight: '15px'
                        }}
                      />

                      <p className='label semibold' style={{ display: 'inline-block' }}>
                        {team.city}&nbsp;
                        <span className='semibold' style={{ color: 'var(--font-color)' }}>
                          {team.name}
                        </span>
                      </p>
                    </div>

                    <div className='semibold small' styleName='team-record'>
                      <Row center='xs'>
                        <Col xs={3}>
                          <p>{team.wins}W - {team.losses}L</p>
                        </Col>

                        <Col xs={3}>
                          <p>{roundOne((team.wins / (team.wins + team.losses)) * 100)}%</p>
                        </Col>

                        <Col xs={3}>
                          <p>{roundTwo(team.ppg)}</p>
                        </Col>

                        <Col xs={3}>
                          {this.getStreakColor(team.streak)}
                        </Col>
                      </Row>
                    </div>

                    <div styleName='right-arrow' style={{ lineHeight: '11px' }}>
                      <RightArrow />
                    </div>
                  </div>
                </Card>
              ))
            }
          </Col>
        </Row>
      </Col>
    )
  }
}

Conference.propTypes = {
  teams: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(Conference)
