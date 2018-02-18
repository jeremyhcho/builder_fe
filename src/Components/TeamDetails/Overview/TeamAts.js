/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'
import moment from 'moment'

// Components
import { Card, Spinner } from 'Components/Common'

// Helpers
import { precisionRound } from 'Helpers'

// Actions
import { fetchNBATeamAts } from 'Actions'

// CSS
import './Overview.scss'

const roundOne = precisionRound(1)

const colors = {
  win: 'var(--dark-green)',
  loss: 'var(--dark-red)',
  tie: 'var(--gold)'
}

class TeamAts extends React.Component {
  componentDidMount () {
    this.props.fetchNBATeamAts(this.props.teamId)
  }
  //
  // getMatchType (game) {
  //   if (game.match_type === 'HOME') {
  //     return 'vs'
  //   }
  //
  //   return '@'
  // }

  wins () {
    return this.props.teamAts.reduce((sum, ats) => (
      sum + (ats.result === 'win' ? 1 : 0)
    ), 0)
  }

  losses () {
    return this.props.teamAts.reduce((sum, ats) => (
      sum + (ats.result === 'loss' ? 1 : 0)
    ), 0)
  }

  ties () {
    return this.props.teamAts.reduce((sum, ats) => (
      sum + (ats.result === 'tie' ? 1 : 0)
    ), 0)
  }

  lastTen () {
    let wins = 0
    let losses = 0
    let ties = 0

    for (const ats of this.props.teamAts.slice(0, 10)) {
      if (ats.result === 'win') {
        wins += 1
      } else if (ats.result === 'loss') {
        losses += 1
      } else {
        ties += 1
      }
    }

    return `${wins}-${losses}-${ties}`
  }

  streak () {
    const lastResult = this.props.teamAts[0].result
    let count = 0
    let index = 0
    let changed = false

    while (!changed) {
      if (this.props.teamAts[index].result === lastResult) {
        count += 1
        index += 1
      } else {
        changed = true
      }
    }

    return (
      <span style={{ color: colors[lastResult] }}>
        {`${lastResult[0].toUpperCase()}${count}`}
      </span>
    )
  }

  render () {
    const { teamAts } = this.props

    if (!teamAts.length) {
      return (
        <Card
          label="Results ATS"
          wrapperStyle={{
            padding: '65px',
            textAlign: 'center'
          }}
        >
          <Spinner lg show />
        </Card>
      )
    }

    const wins = this.wins()
    const losses = this.losses()
    const ties = this.ties()

    return (
      <div>
        <div style={{ display: 'flex', width: '800px', alignItems: 'center' }}>
          <Card
            label="Results ATS"
            style={{ marginRight: '20px' }}
            wrapperStyle={{
              padding: '25px',
              textAlign: 'center',
              height: '110px',
              width: '140px',
              position: 'relative'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <h4 className='semibold'>{wins}</h4>
              <p className='semibold label'>Wins</p>
            </div>
          </Card>

          <Card
            wrapperStyle={{
              padding: '25px',
              textAlign: 'center',
              height: '110px',
              width: '140px',
              position: 'relative'
            }}
            style={{ marginTop: '57px', marginRight: '20px' }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <h4 className='semibold'>{losses}</h4>
              <p className='semibold label'>Losses</p>
            </div>
          </Card>

          <Card
            wrapperStyle={{
              padding: '25px',
              textAlign: 'center',
              height: '110px',
              width: '140px',
              position: 'relative'
            }}
            style={{ marginTop: '57px', marginRight: '20px' }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <h4 className='semibold'>{roundOne(((wins + ties) / (wins + losses + ties)) * 100)}%</h4>
              <p className='semibold label'>Cover %</p>
            </div>
          </Card>

          <Card
            wrapperStyle={{
              padding: '25px',
              textAlign: 'center',
              height: '110px',
              width: '140px',
              position: 'relative'
            }}
            style={{ marginTop: '57px', marginRight: '20px' }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <h4 className='semibold'>{this.lastTen()}</h4>
              <p className='semibold label'>Last 10</p>
            </div>
          </Card>

          <Card
            wrapperStyle={{
              padding: '25px',
              textAlign: 'center',
              height: '110px',
              width: '140px',
              position: 'relative'
            }}
            style={{ marginTop: '57px' }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <h4 className='semibold'>{this.streak()}</h4>
              <p className='semibold label'>Streak</p>
            </div>
          </Card>
        </div>

        <Card
          wrapperStyle={{ padding: '25px' }}
        >
          <div styleName="team-ats-container">
            <Row center='xs' styleName='ats-row-label'>
              <Col xs={3}>
                <p className="small label">OPPONENT</p>
              </Col>

              <Col xs={3}>
                <p className="small label">VEGAS SPREAD</p>
              </Col>

              <Col xs={3}>
                <p className="small label">SCORES</p>
              </Col>

              <Col xs={3}>
                <p className="small label">ATS RESULT</p>
              </Col>
            </Row>
            <div styleName="team-ats">
              {
                teamAts.map((ats, i) => (
                  <Row
                    center='xs'
                    styleName="ats-row"
                    key={i}
                  >
                    <Col
                      xs={3}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <p className='semibold'>{moment(new Date(ats.date)).format('M/D/YY')}</p>
                    </Col>

                    <Col
                      xs={3}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <p className="semibold">
                        {ats.vegas_spread}
                      </p>
                    </Col>

                    <Col xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img src={ats.image} style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                      <span className='semibold'>{ats.points}</span>
                      <span style={{ margin: '0 10px' }}>-</span>
                      <span className='semibold'>{ats.opposing_team.points}</span>
                      <img src={ats.opposing_team.image} style={{ width: '20px', height: '20px', marginLeft: '5px' }} />
                    </Col>

                    <Col
                      xs={3}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <p
                        className="semibold"
                        style={{ color: colors[ats.result] }}
                      >
                        {ats.result[0].toUpperCase()}
                      </p>
                    </Col>
                  </Row>
                ))
              }
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

TeamAts.defaultProps = {
  teamAts: []
}

TeamAts.propTypes = {
  teamAts: PropTypes.array,
  teamId: PropTypes.string.isRequired,
  fetchNBATeamAts: PropTypes.func.isRequired
}

const mapStateToProps = ({ routines }) => ({
  teamAts: routines.nba.teamAts
})

const mapDispatchToProps = {
  fetchNBATeamAts
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamAts)
