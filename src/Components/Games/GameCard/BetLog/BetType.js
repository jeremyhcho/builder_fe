import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'

// Components
import { InfoBubble, Slider, Button } from 'Components/Common'

// Icons
import UpArrow from 'Assets/Icons/green-arrow-up.svg'
import DownArrow from 'Assets/Icons/red-arrow-down.svg'
import WhiteCheck from 'Assets/Icons/white-check.svg'

// CSS
import './BetLog.scss'

// Actions
import { createNBABet, updateNBAMatchBet } from 'Actions'

class BetType extends React.Component {
  state = {
    units: this.props.matchBet.units || 0,
    selectedTeam: this.getSelectedTeam(this.props.matchBet)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.betType !== this.props.betType) {
      this.setState({
        units: newProps.matchBet.units || 0,
        selectedTeam: this.getSelectedTeam(newProps.matchBet)
      })
    }

    if (newProps.show && !this.props.show && newProps.matchBet) {
      this.setState({
        units: newProps.matchBet.units || 0,
        selectedTeam: this.getSelectedTeam(newProps.matchBet)
      })
    }
  }

  getSelectedTeam (matchBet) {
    if (matchBet.bet_type === 'total') {
      const totalPick = matchBet.pick[0] === 'O' ? 'away' : 'home'

      return {
        type: totalPick,
        id: this.props.game[totalPick].team_id
      }
    }

    return {
      type: this.findTeamType(matchBet.team_id) || null,
      id: matchBet.team_id || null
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  selectTeam = (team) => {
    return () => {
      this.setState({ selectedTeam: { type: team, id: this.props.game[team].team_id } })
    }
  }

  findTeamType (teamId) {
    const { game } = this.props
    if (!teamId) return null

    return game.away.team_id === teamId ? 'away' : 'home'
  }

  submitBet = (betId) => {
    const { game, betType } = this.props
    const { units, selectedTeam } = this.state
    let createdBet

    switch (betType) {
      case 'moneyline':
        createdBet = {
          match_id: game.id,
          team_id: selectedTeam.id,
          bet_type: betType,
          units,
          odds: game[selectedTeam.type].odds.moneyline
        }
        break;

      case 'spread':
        createdBet = {
          match_id: game.id,
          team_id: selectedTeam.id,
          bet_type: betType,
          units,
          pick: game[selectedTeam.type].odds[betType],
          odds: game[selectedTeam.type].odds.spread_odds
        }
        break;

      case 'total':
        createdBet = {
          match_id: game.id,
          bet_type: betType,
          units,
          pick: selectedTeam.type === 'away' ? (
            `O${game[selectedTeam.type].odds.total}`
          ) : (
            `U${game[selectedTeam.type].odds.total}`
          ),
          odds: game[selectedTeam.type].odds.total_odds
        }
        break;

      default:
        return createdBet = null
    }

    if (betId) {
      return this.props.updateNBAMatchBet(betId, createdBet)
    }

    return this.props.createNBABet(createdBet)
  }

  renderButton () {
    const { matchBet, creatingMatchBet, updatingMatchBet } = this.props
    if (creatingMatchBet || updatingMatchBet) {
      return <Button success loading />
    }

    if (!Object.keys(matchBet).length) {
      return <Button success onClick={this.submitBet}>Create</Button>
    }

    return (
      <Button success onClick={() => this.submitBet(matchBet.id)}>
        Save
      </Button>
    )
  }

  renderTeamCard (team) {
    const { game, betType } = this.props

    if (betType === 'moneyline') {
      return ([
        <div style={{ padding: '0 33px' }} key='image'>
          <img src={game[team].image} />
        </div>,
        <p className="semibold" key='value'>
          {game[team].odds[betType]}
        </p>
      ])
    }

    if (betType === 'spread') {
      return ([
        <div style={{ padding: '0 33px' }} key='image'>
          <img src={game[team].image} />
        </div>,
        <p className="semibold" key='value'>
          {game[team].odds[betType]} {`(${game[team].odds.spread_odds})`}
        </p>
      ])
    }

    if (betType === 'total') {
      const overUnderTag = { marginBottom: '8px' }
      return ([
        <div style={{ padding: '0 38px' }} key="image">
          {
            team === 'away'
              ? <UpArrow height={30} width={45} />
              : <DownArrow height={30} width={45} />
          }
          {
            team === 'away'
              ? <p className="semibold label" style={overUnderTag}>OVER</p>
              : <p className="semibold label" style={overUnderTag}>UNDER</p>
          }
        </div>,
        <p className="semibold" key='value'>
          {game[team].odds[betType]} {`(${game[team].odds.total_odds})`}
        </p>
      ])
    }

    return null
  }

  render () {
    return (
      [
        <div styleName='row' key='message' style={{ marginBottom: '25px' }}>
          <p className='label'>
            {
              Object.keys(this.props.matchBet).length ? (
                'Odds and spread might have changed since your current bet. Saving' +
                ' will apply the current odds and spread.'
              ) : null
            }
          </p>
        </div>,

        <div styleName="row units" key="units">
          <div styleName="left">
            <p className="semibold">Units</p>

            <span>
              <InfoBubble pos="topRight" width={300}>
                <p
                  className='small label'
                  style={{ textAlign: 'left' }}
                >
                  WHAT IS THIS?
                </p>

                <p style={{ textAlign: 'left', marginTop: '10px' }}>
                  Units denotes the amount of currency in "units" placed on the bet.
                </p>
              </InfoBubble>
            </span>
          </div>

          <div styleName="right">
            <Slider
              name="units"
              value={this.state.units}
              min={0}
              max={10}
              step={0.5}
              onChange={this.handleChange}
            />
          </div>

          <div styleName="cta">
            {this.renderButton()}
          </div>
        </div>,

        <div styleName="row pick" key="pick">
          <div styleName="left">
            <p className="semibold">Pick</p>

            <span>
              <InfoBubble pos="topRight" width={300}>
                <p
                  className='small label'
                  style={{ textAlign: 'left' }}
                >
                  WHAT IS THIS?
                </p>

                <p style={{ textAlign: 'left', marginTop: '10px' }}>
                  "Pick" represents what side of the line you take on the given bet.
                </p>
              </InfoBubble>
            </span>
          </div>

          <div styleName="right">
            {
              ['away', 'home'].map(team => {
                const selected = this.state.selectedTeam.type === team
                const teamCardStyle = classNames('team-card', {
                  selected
                })


                return (
                  <div
                    styleName={teamCardStyle}
                    onClick={this.selectTeam(team)}
                    key={team}
                  >
                    {
                      selected &&
                      <span>
                        <WhiteCheck />
                      </span>
                    }
                    {this.renderTeamCard(team)}
                  </div>
                )
              })
            }
          </div>
        </div>
      ]
    )
  }
}

BetType.defaultProps = {
  matchBet: {},
  creatingMatchBet: false,
  updatingMatchBet: false
}

BetType.propTypes = {
  betType: PropTypes.string.isRequired,
  matchBet: PropTypes.object,
  game: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  createNBABet: PropTypes.func.isRequired,
  updateNBAMatchBet: PropTypes.func.isRequired,
  creatingMatchBet: PropTypes.bool,
  updatingMatchBet: PropTypes.bool
}

const mapStateToProps = ({ routines }) => ({
  creatingMatchBet: routines.isLoading.CREATE_NBA_BET,
  updatingMatchBet: routines.isLoading.UPDATE_NBA_MATCH_BET
})

const mapDispatchToProps = {
  createNBABet,
  updateNBAMatchBet
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BetType)
