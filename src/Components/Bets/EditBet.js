import React from 'react'
import PropTypes from 'prop-types'

// Component
import { Slider, InfoBubble } from 'Components/Common'

// Icons
// import UpArrow from 'Assets/Icons/green-arrow-up.svg'
// import DownArrow from 'Assets/Icons/red-arrow-down.svg'
// import WhiteCheck from 'Assets/Icons/white-check.svg'

// CSS
import '../Games/GameCard/BetLog/BetLog.scss'

class EditBet extends React.Component {
  state = {
    units: this.props.bet.units,
    selectedTeam: this.getSelectedTeam(this.props.bet)
  }

  getSelectedTeam (matchBet) {
    if (matchBet.bet_type === 'total') {
      const totalPick = matchBet.pick[0] === 'O' ? 'away' : 'home'

      return {
        type: totalPick,
        id: this.props.bet.match[totalPick].team_id
      }
    }

    return {
      type: this.findTeamType(matchBet.team_id),
      id: matchBet.team_id
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // renderTeamCard (team) {
  //   const { game, betType } = this.props
  //
  //   if (betType === 'moneyline') {
  //     return ([
  //       <div style={{ padding: '0 33px' }}>
  //         <img src={game[team].image} key='image' />
  //       </div>,
  //       <p className="semibold" key='value'>
  //         {game[team].odds[betType]}
  //       </p>
  //     ])
  //   }
  //
  //   if (betType === 'spread') {
  //     return ([
  //       <div style={{ padding: '0 33px' }}>
  //         <img src={game[team].image} key='image' />
  //       </div>,
  //       <p className="semibold" key='value'>
  //         {game[team].odds[betType]} {`(${game[team].odds.spread_odds})`}
  //       </p>
  //     ])
  //   }
  //
  //   if (betType === 'total') {
  //     const overUnderTag = { marginBottom: '8px' }
  //     return ([
  //       <div style={{ padding: '0 38px' }}>
  //         {
  //           team === 'away'
  //             ? <UpArrow height={30} width={45} key="image" />
  //             : <DownArrow height={30} width={45} key="image" />
  //         }
  //         {
  //           team === 'away'
  //             ? <p className="semibold label" style={overUnderTag} key="over">OVER</p>
  //             : <p className="semibold label" style={overUnderTag} key="under">UNDER</p>
  //         }
  //       </div>,
  //       <p className="semibold" key='value'>
  //         {game[team].odds[betType]} {`(${game[team].odds.total_odds})`}
  //       </p>
  //     ])
  //   }
  //
  //   return null
  // }

  render () {
    const { bet } = this.props

    console.log(bet)
    return (
      <div>
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
        </div>
      </div>
    )
  }
}

EditBet.propTypes = {
  bet: PropTypes.object.isRequired
}

export default EditBet
