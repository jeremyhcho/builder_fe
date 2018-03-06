import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'

// Component
import { Slider, InfoBubble } from 'Components/Common'

// Icons
import UpArrow from 'Assets/Icons/green-arrow-up.svg'
import DownArrow from 'Assets/Icons/red-arrow-down.svg'
import WhiteCheck from 'Assets/Icons/white-check.svg'

// CSS
import './Bets.scss'

// Actions
import { updateNBABet, closeBetModal, closeEditBet } from 'Actions'

class EditBet extends React.Component {
  state = {
    units: this.props.bet.units,
    selectedTeam: this.getSelectedTeam(this.props.bet)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.submitEditBet && !this.props.submitEditBet) {
      this.submitBet(newProps.bet.id)
    }

    if (!newProps.updatingBet && this.props.updatingBet) {
      this.props.closeBetModal()
      this.props.closeEditBet()
    }
  }

  getSelectedTeam (matchBet) {
    if (matchBet.bet_type === 'total') {
      const totalPick = matchBet.pick[0] === 'O' ? 'away' : 'home'

      return {
        type: totalPick, // away or home
        id: this.props.bet.match[totalPick].team_id // 13
      }
    }

    return {
      type: this.findTeamType(matchBet.team_id), // away or home
      id: matchBet.team_id // 13
    }
  }

  submitBet (betId) {
    const { bet } = this.props
    const betType = bet.bet_type
    const game = bet.match
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

    return this.props.updateNBABet(betId, createdBet)
  }

  findTeamType (teamId) {
    if (!teamId) return null

    return this.props.bet.match.away.team_id === teamId ? 'away' : 'home'
  }

  selectTeam = (team) => {
    return () => {
      this.setState({ selectedTeam: { type: team, id: this.props.bet.match[team].team_id } })
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  renderTeamCard (team) {
    const { bet } = this.props

    const betType = bet.bet_type
    const game = bet.match

    if (betType === 'moneyline') {
      return ([
        <div style={{ padding: '0 33px' }} key='image-moneyline'>
          <img src={game[team].image} />
        </div>,
        <p className="semibold" key='value-moneyline'>
          {game[team].odds.moneyline}
        </p>
      ])
    }

    if (betType === 'spread') {
      return ([
        <div style={{ padding: '0 33px' }} key='image-spread'>
          <img src={game[team].image} />
        </div>,
        <p className="semibold" key='value-spread'>
          {game[team].odds.spread} {`(${game[team].odds.spread_odds})`}
        </p>
      ])
    }

    if (betType === 'total') {
      const overUnderTag = { marginBottom: '8px' }
      return ([
        <div style={{ padding: '0 38px' }} key="image-total">
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
        <p className="semibold" key='value-total'>
          {game[team].odds.total} {`(${game[team].odds.total_odds})`}
        </p>
      ])
    }

    return null
  }

  render () {
    const { bet } = this.props
    console.log(bet)

    return (
      <div styleName="edit-bet-modal">
        <h4 className="semibold">{bet.bet_type[0].toUpperCase() + bet.bet_type.substr(1)}</h4>

        <div styleName='row' key='message' style={{ marginBottom: '25px' }}>
          <p className='label'>
            Odds and spread might have changed since your current bet. Saving {' '}
            will apply the current odds and spread.
          </p>
        </div>

        <div styleName="row units">
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
        </div>

        <div styleName="row pick">
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
      </div>
    )
  }
}

EditBet.defaultProps = {
  bet: {},
  submitEditBet: false,
  updatingBet: false
}

EditBet.propTypes = {
  bet: PropTypes.object,
  submitEditBet: PropTypes.bool,
  updateNBABet: PropTypes.func.isRequired,
  updatingBet: PropTypes.bool,
  closeBetModal: PropTypes.func.isRequired,
  closeEditBet: PropTypes.func.isRequired
}

const mapStateToProps = ({ nba, routines }) => ({
  submitEditBet: nba.bets.submitEditBet,
  updatingBet: routines.isLoading.UPDATE_NBA_BET
})

const mapDispatchToProps = {
  updateNBABet,
  closeBetModal,
  closeEditBet
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditBet)
